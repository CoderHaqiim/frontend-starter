"use client"

import ContactSupport from "@/src/components/app/forms/contactSupport"
import SupportArticleRow from "@/src/components/app/supportArticleRow"
import SupportCategoryCard from "@/src/components/app/supportCategoryCard"
import Section from "@/src/components/base/layout/section"
import Card from "@/src/components/base/ui/composites/card"
import EmptyState from "@/src/components/base/ui/composites/emptyState"
import List from "@/src/components/base/ui/composites/list"
import Tooltip from "@/src/components/base/ui/composites/tooltip"
import Button from "@/src/components/base/ui/primitives/button"
import Frame from "@/src/components/base/ui/primitives/frame"
import Heading from "@/src/components/base/ui/primitives/heading"
import Icon from "@/src/components/base/ui/primitives/icon"
import Input from "@/src/components/base/ui/primitives/input"
import Paragraph from "@/src/components/base/ui/primitives/paragraph"
import { useTheme } from "@/src/components/providers/themeProvider"
import { getHelpCategory, helpCategories, popularArticles } from "@/src/data/supportHelp"
import { useBackdropState } from "@/src/store/backdropState"
import { useMemo, useState } from "react"

/*
 * The Support page: the help Aiki offers, and the way to reach the team when the help does
 * not answer the question.
 *
 * The help content is the topics and their articles (src/data/supportHelp.ts), which is why
 * the search filters and selects on the page rather than pretending to search a knowledge
 * base - there is nothing behind it to search yet. When the guides themselves exist, this
 * page serves them, and its shape does not have to change.
 */
export default function SupportPage() {
  const { colors } = useTheme()
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const [query, setQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null)

  const searchTerm = query.trim().toLowerCase()

  /*
   * The topics the search leaves, each with the articles that match it. A topic whose own
   * name or description matches keeps all of its articles - the reader asked for the topic -
   * and every other topic is narrowed to the articles that match.
   */
  const visibleCategories = useMemo(() => {
    const matches = (value: string) => value.toLowerCase().includes(searchTerm)

    if (!searchTerm) {
      return helpCategories.map((category) => ({ category, articles: category.articles }))
    }

    return helpCategories
      .map((category) => ({
        category,
        articles:
          matches(category.title) || matches(category.description)
            ? category.articles
            : category.articles.filter((article) => matches(article.title)),
      }))
      .filter((entry) => entry.articles.length > 0)
  }, [searchTerm])

  const matchingArticleCount = visibleCategories.reduce(
    (total, entry) => total + entry.articles.length,
    0,
  )

  const openContactSupport = () => {
    setBackdropOpen(true)
    setBackdropContent(<ContactSupport />)
  }

  /*
   * Choosing an article marks it as the one being read and brings its row into view in the
   * topic it belongs to. The guides are not written yet, so a row leads to the topic rather
   * than to a page that would say nothing: the articles are the help content this page holds.
   */
  const selectArticle = (articleId: string) => {
    setSelectedArticleId(articleId)

    document
      .getElementById(`help-article-${articleId}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  return (
    <Frame className="flex w-full flex-col">
      {/* Header, with the search the page is built around */}
      <Section>
        <Frame className="w-full justify-between flex-wrap gap-[var(--space-md)]">
          <Frame className="gap-[var(--space-xs)] h-max flex-col">
            <Heading size="xl" type="h1">
              Support
            </Heading>
            <Paragraph weight="light" size="sm">
              Find answers, troubleshoot issues, or get help from the Aiki team.
            </Paragraph>
          </Frame>

          <Frame>
            <Button variant="outline" size="sm" iconName="icon-headset" func={openContactSupport}>
              Contact Support
            </Button>
          </Frame>
        </Frame>

        {/* Search: the whole help content is filtered by it, so it sits at the top. */}
        <Frame
          className="w-full max-w-[560px] items-center gap-[var(--space-sm)] rounded-[var(--radius-sm)] bg-[var(--color-white)] pl-[var(--space-md)] pr-[var(--space-sm)]"
          specificStyles={{
            border: isSearchFocused
              ? `1.5px solid ${colors["accent"]}`
              : `1px solid ${colors["outline1"]}`,
          }}
        >
          <Icon name="icon-search" size="md" stroke="1.5" color={isSearchFocused ? "accent" : "muted"} />

          <Frame className="flex-1">
            <Input
              name="helpSearch"
              variant="default"
              type="text"
              size="lg"
              placeholder="Search for answers..."
              formFunc={(event) => setQuery(event.target.value)}
              func={() => setIsSearchFocused((previous) => !previous)}
              specificStyle={{ paddingLeft: 0, paddingRight: 0 }}
            />
          </Frame>

          {query.length > 0 && (
            <Tooltip content="clear search" position="bottom">
              <Button variant="ghost" size="sm" isIcon iconName="icon-x" func={() => setQuery("")} />
            </Tooltip>
          )}
        </Frame>
      </Section>

      {/* Help Center */}
      <Section>
        <Frame className="w-full items-center justify-between flex-wrap gap-[var(--space-sm)]">
          <Heading size="md" type="h2">
            Help Center
          </Heading>

          {/* What the search left, said before the cards so a short answer reads as an answer
              rather than as a page that lost its content. */}
          {searchTerm && (
            <Paragraph size="xs" weight="light">
              {matchingArticleCount === 1 ? "1 article matches" : `${matchingArticleCount} articles match`}{" "}
              &ldquo;{query.trim()}&rdquo;
            </Paragraph>
          )}
        </Frame>

        {visibleCategories.length > 0 ? (
          <Frame className="w-full flex flex-wrap gap-[var(--space-lg)]">
            {visibleCategories.map((entry) => (
              <SupportCategoryCard
                key={entry.category.id}
                category={entry.category}
                articles={entry.articles}
                selectedArticleId={selectedArticleId}
                onSelectArticle={selectArticle}
              />
            ))}
          </Frame>
        ) : (
          <EmptyState
            surface=""
            message={`Nothing in the help center matches "${query.trim()}". Try another word, or contact support below.`}
          />
        )}
      </Section>

      {/* Popular articles. They are hidden while a search is running, because the search
          already answers with the same articles, narrowed. */}
      {!searchTerm && (
        <Section>
          <Heading size="md" type="h2">
            Popular articles
          </Heading>

          <List scroll="hidden">
            {popularArticles.map((article) => (
              <SupportArticleRow
                key={article.id}
                id={`popular-article-${article.id}`}
                title={article.title}
                categoryTitle={getHelpCategory(article.categoryId)?.title}
                isSelected={selectedArticleId === article.id}
                onSelect={() => selectArticle(article.id)}
              />
            ))}
          </List>
        </Section>
      )}

      {/* Contact support */}
      <Section>
        <Card width="100%" height="max-content" padding="lg" className="gap-[var(--space-md)]">
          <Frame className="w-full items-center justify-between flex-wrap gap-[var(--space-md)]">
            <Frame className="items-center gap-[var(--space-md)]">
              <Frame className="h-max w-max items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-accent3)] p-[var(--space-md)]">
                <Icon name="icon-headset" size="lg" stroke="1.5" color="accent" />
              </Frame>

              <Frame className="flex-col gap-[var(--space-xxs)]">
                <Heading size="md" type="h2">
                  Still need help?
                </Heading>
                <Paragraph size="sm" weight="light">
                  Our support team is here to help.
                </Paragraph>
              </Frame>
            </Frame>

            <Button variant="fill" size="md" func={openContactSupport}>
              Contact Support
            </Button>
          </Frame>
        </Card>
      </Section>
    </Frame>
  )
}
