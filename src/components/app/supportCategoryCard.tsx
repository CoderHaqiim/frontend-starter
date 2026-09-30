"use client"

import { HelpArticle, HelpCategory } from "@/src/data/supportHelp"
import Card from "../base/ui/composites/card"
import Frame from "../base/ui/primitives/frame"
import Heading from "../base/ui/primitives/heading"
import Icon from "../base/ui/primitives/icon"
import Paragraph from "../base/ui/primitives/paragraph"
import SupportArticleRow from "./supportArticleRow"

type SupportCategoryCardProps = {
  category: HelpCategory
  // The articles to list: all of the topic's articles, or only the ones a search matched.
  articles: HelpArticle[]
  selectedArticleId: string | null
  onSelectArticle: (articleId: string) => void
}

/*
 * One help topic as a card: what it covers, how much is in it, and the articles themselves.
 *
 * The articles are listed rather than hidden behind the card, because they are the help
 * content this page holds: a reader can see what a topic answers before opening anything,
 * and the list is what a search filters.
 */
export default function SupportCategoryCard({
  category,
  articles,
  selectedArticleId,
  onSelectArticle,
}: SupportCategoryCardProps) {
  const articleCount = articles.length

  return (
    <Card
      width="100%"
      height="max-content"
      padding="lg"
      className="flex-1 min-w-[280px] min-h-[200px] max-w-[280px] gap-[var(--space-lg)]"
    >
      <Frame className="w-full items-start gap-[var(--space-lg)]">
        <Frame className="h-max w-max items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-accent3)] p-[var(--space-sm)]">
          <Icon name={category.icon} size="md" stroke="1.5" color="accent" />
        </Frame>

        <Frame className="w-full flex-col gap-[var(--space-xs)]">
          <Frame className="w-full items-center justify-between gap-[var(--space-xs)]">
            <Heading size="sm" type="h3">
              {category.title}
            </Heading>
          </Frame>

          <Paragraph size="xs" weight="light">
            {category.description}
          </Paragraph>
        </Frame>
      </Frame>

      <Frame className="w-full rounded-[var(--radius-sm)] flex-col bg-[var(--color-background1)] gap-[var(--space-xxs)]">
        {articles.map((article) => (
          <SupportArticleRow
            key={article.id}
            id={`help-article-${article.id}`}
            title={article.title}
            isSelected={selectedArticleId === article.id}
            onSelect={() => onSelectArticle(article.id)}
          />
        ))}
      </Frame>
    </Card>
  )
}
