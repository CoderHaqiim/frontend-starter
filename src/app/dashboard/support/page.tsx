"use client"

import ContactSupport from "@/src/components/app/forms/contactSupport"
import SupportArticleRow from "@/src/components/app/supportArticleRow"
import Section from "@/src/components/base/layout/section"
import Card from "@/src/components/base/ui/composites/card"
import List from "@/src/components/base/ui/composites/list"
import Button from "@/src/components/base/ui/primitives/button"
import Frame from "@/src/components/base/ui/primitives/frame"
import Heading from "@/src/components/base/ui/primitives/heading"
import Icon from "@/src/components/base/ui/primitives/icon"
import Paragraph from "@/src/components/base/ui/primitives/paragraph"
import { popularArticles } from "@/src/data/supportHelp"
import { useBackdropState } from "@/src/store/backdropState"
import { useState } from "react"

/*
 * The Support page: the help Aiki offers, and the way to reach the team when the help does
 * not answer the question.
 *
 * The help content is the popular articles (src/data/supportHelp.ts) - the titles the help
 * center lists, with nothing written behind them yet. When the guides themselves exist, this
 * page serves them, and its shape does not have to change.
 */
export default function SupportPage() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null)

  const openContactSupport = () => {
    setBackdropOpen(true)
    setBackdropContent(<ContactSupport />)
  }

  /*
   * Choosing an article marks it as the one being read and brings its row into view. The
   * guides are not written yet, so a row marks itself rather than leading to a page that
   * would say nothing: the articles are the help content this page holds.
   */
  const selectArticle = (articleId: string) => {
    setSelectedArticleId(articleId)

    document
      .getElementById(`popular-article-${articleId}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  return (
    <Frame className="flex w-full flex-col">
      {/* Header, with the way to reach the team */}
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
      </Section>

      {/* Popular articles */}
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
              isSelected={selectedArticleId === article.id}
              onSelect={() => selectArticle(article.id)}
            />
          ))}
        </List>
      </Section>

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
