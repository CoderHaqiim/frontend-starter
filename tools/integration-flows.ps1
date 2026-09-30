<#
The integration flows, checked end to end against a running app.

Usage:  powershell -File tools/integration-flows.ps1 -BaseUrl http://localhost:3011

An integration has one flow here, and it is a save rather than a move: the permissions are
read, the user answers the switches, and the whole list they left on is sent once, when they
save. This walks that flow for WhatsApp and Google - a list of two lands together, a shorter
list replaces the longer one rather than adding to it, an empty list turns everything off -
and checks the refusals: a name the integration does not have fails the whole save and
changes nothing, a body that is not a list of names is refused, and an unknown integration is
refused.

It also checks that no answer carries anything the screen should not be shown. It leaves every
permission off, which is the state the app ships with, so a run can be repeated.
#>

param(
  [string]$BaseUrl = "http://localhost:3000"
)

# The progress stream of Invoke-WebRequest would otherwise drown the checks.
$ProgressPreference = "SilentlyContinue"

$script:checks = 0
$script:failures = 0
$script:bodies = @()

function Check($name, $passed, $detail = "") {
  $script:checks++

  if ($passed) {
    Write-Output "PASS  $name"
  } else {
    $script:failures++
    Write-Output "FAIL  $name  $detail"
  }
}

function Get-Json($path) {
  $response = Invoke-WebRequest -Uri "$BaseUrl$path" -UseBasicParsing -Method Get
  $script:bodies += $response.Content

  return $response.Content | ConvertFrom-Json
}

function Get-Status($path, $method = "Get", $body = $null) {
  try {
    $params = @{ Uri = "$BaseUrl$path"; Method = $method; UseBasicParsing = $true }

    if ($null -ne $body) {
      $params["Body"] = $body | ConvertTo-Json -Depth 6
      $params["ContentType"] = "application/json"
    }

    Invoke-WebRequest @params | Out-Null

    return 200
  } catch {
    return [int]$_.Exception.Response.StatusCode
  }
}

function Find-Provider($summaries, $provider) {
  return $summaries | Where-Object { $_.provider -eq $provider }
}

function Find-Permission($detail, $permissionId) {
  return $detail.permissions | Where-Object { $_.id -eq $permissionId }
}

# What is allowed for one integration, as the card and the panel both read it.
function Allowed-Count($provider) {
  return (Get-Json "/api/integrations/$provider").allowedCount
}

# Saving the list the user left switched on, as the screen sends it. The body is written out
# by hand so that a list of one is still a list: the JSON writer of Windows PowerShell folds a
# single value into a scalar, and this route is meant to receive a list or nothing.
function Save-Permissions($provider, $permissionIds) {
  $quoted = ($permissionIds | ForEach-Object { '"' + $_ + '"' }) -join ","
  $body = '{"permissions":[' + $quoted + ']}'

  $response = Invoke-WebRequest -Uri "$BaseUrl/api/integrations/$provider/permissions" `
    -Method Put -UseBasicParsing -ContentType "application/json" -Body $body

  $script:bodies += $response.Content

  return $response.Content | ConvertFrom-Json
}

# The switches start from a known state, so a run does not depend on what a previous one left
# behind.
function Clear-Permissions($provider) {
  $null = Save-Permissions $provider @()
}

# --------------------------------------------------------------- the list

$list = Get-Json "/api/integrations"
Check "both integrations are listed" ($list.Count -eq 2) "count=$($list.Count)"

$whatsapp = Find-Provider $list "whatsapp"
$google = Find-Provider $list "google"

Check "WhatsApp is listed" ($whatsapp.name -eq "WhatsApp") "$($whatsapp.name)"
Check "Google is listed" ($google.name -eq "Google") "$($google.name)"
Check "a card opens the permissions" (($whatsapp.actionLabel -eq "Permissions") -and ($google.actionLabel -eq "Permissions"))
Check "a card carries no connection state" (($null -eq $whatsapp.status) -and ($null -eq $google.status))

# --------------------------------------------------------------- the save

foreach ($provider in @("whatsapp", "google")) {
  Clear-Permissions $provider

  $detail = Get-Json "/api/integrations/$provider"
  $first = $detail.permissions[0].id
  $second = $detail.permissions[1].id

  Check "$provider starts with nothing allowed" ($detail.allowedCount -eq 0) "count=$($detail.allowedCount)"
  Check "$provider lists its permissions" ($detail.permissions.Count -gt 0) "count=$($detail.permissions.Count)"
  Check "$provider starts every switch off" ($detail.permissions[0].enabled -eq $false)
  Check "$provider says nothing is allowed on the card" ((Find-Provider (Get-Json "/api/integrations") $provider).allowedCount -eq 0)

  # A whole list saved at once, which is what the screen sends when the user presses save.
  $savedTwo = Save-Permissions $provider @($first, $second)
  Check "$provider takes a list of two in one save" ($savedTwo.data.allowedCount -eq 2) "count=$($savedTwo.data.allowedCount)"
  Check "$provider reads the first back as saved" ((Find-Permission $savedTwo.data $first).enabled -eq $true)
  Check "$provider reads the second back as saved" ((Find-Permission $savedTwo.data $second).enabled -eq $true)
  Check "the card counts the two" ((Find-Provider (Get-Json "/api/integrations") $provider).allowedCount -eq 2)

  # A shorter list replaces the longer one: what the user left off is off, not kept.
  $savedOne = Save-Permissions $provider @($second)
  Check "$provider replaces the list rather than adding to it" ($savedOne.data.allowedCount -eq 1) "count=$($savedOne.data.allowedCount)"
  Check "$provider turns off what left the list" ((Find-Permission $savedOne.data $first).enabled -eq $false)

  # The same list again is a save like any other and changes nothing.
  Check "$provider saves the same list twice without a change" ((Save-Permissions $provider @($second)).data.allowedCount -eq 1)

  # A name the integration does not have fails the whole save, so the list is never part-applied.
  $refused = Save-Permissions $provider @($first, "not-a-permission")
  Check "$provider refuses a name it does not have" ($refused.problem -ne $null) "$($refused.message)"
  Check "$provider saved nothing but the refusal" ((Allowed-Count $provider) -eq 1)

  # Nothing on at all is a list like any other.
  Check "$provider turns everything off with an empty list" ((Save-Permissions $provider @()).data.allowedCount -eq 0)
  Check "$provider reads nothing allowed afterwards" ((Allowed-Count $provider) -eq 0)
}

# --------------------------------------------------------------- what is refused

# The body has to be a list of permission names.
Check "a save with no list is refused" ((Get-Status "/api/integrations/whatsapp/permissions" "Put" @{}) -eq 400)
Check "a save whose list is not a list is refused" ((Get-Status "/api/integrations/whatsapp/permissions" "Put" @{ permissions = "figures" }) -eq 400)
Check "a save with an entry that is not a name is refused" ((Get-Status "/api/integrations/whatsapp/permissions" "Put" @{ permissions = @("figures", 7) }) -eq 400)
Check "a save with an empty name is refused" ((Get-Status "/api/integrations/whatsapp/permissions" "Put" @{ permissions = @("figures", "  ") }) -eq 400)

Check "an unknown integration is refused" ((Get-Status "/api/integrations/slack") -eq 404)
Check "an unknown integration cannot be saved" ((Get-Status "/api/integrations/slack/permissions" "Put" @{ permissions = @() }) -eq 404)

# --------------------------------------------------------------- what never travels

# What the screen is not shown: a credential, a token, a provider scope URL, a secret, and the
# server wiring behind an integration.
foreach ($forbidden in @("token", "secret", "credential", "password", "oauth", "scope", "authorizationUrl")) {
  Check "no answer carries `"$forbidden`"" (-not ($script:bodies -match [regex]::Escape($forbidden)))
}

Write-Output ""
Write-Output "$($script:checks - $script:failures)/$($script:checks) checks passed"

if ($script:failures -gt 0) { exit 1 }
