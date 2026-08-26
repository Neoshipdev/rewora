/**
 * Vlákno v poradni a fóre tak, ako ho vidí zákazník pri produkte.
 * Používa sa v mockupe admin panela aj v sekcii Nástroje.
 */
import type { Lang } from '@/lib/i18n';
import { qa as qaData } from '@/lib/panel-data';
import { tDeep } from '@/lib/t';

function ThreadActions({
  helpful,
  withReply,
  report,
}: {
  helpful: { up: number; down: number };
  withReply?: boolean;
  report: string;
}) {
  return (
    <div className="thread__actions">
      {withReply && <span aria-hidden>↩</span>}
      <span>👍 {helpful.up}</span>
      <span>👎 {helpful.down}</span>
      <span className="thread__report">⚑ {report}</span>
    </div>
  );
}

export default function ForumThread({
  showStrip = true,
  lang = 'sk',
}: {
  showStrip?: boolean;
  lang?: Lang;
}) {
  const qa = tDeep(qaData, lang);
  return (
    <div className="panel__stack" style={{ gap: 12 }}>
      <div className="thread__head">
        <span className="thread__back" aria-hidden>
          ‹
        </span>
        <span className="thread__title">{qa.question.title}</span>
      </div>

      <div className="thread">
        <div className="thread__item">
          <span className="thread__avatar">{qa.question.initials}</span>
          <div className="thread__author">
            <b>{qa.question.author}</b>
            <span className="thread__date">{qa.question.date}</span>
          </div>
          <div className="thread__body">
            <span className="thread__q">{qa.question.title}</span>
            <p className="thread__text">{qa.question.text}</p>
            <ThreadActions helpful={qa.question.helpful} report={qa.report} />
          </div>
        </div>

        <div className="thread__item thread__item--nested">
          <span className="thread__avatar">{qa.answer.initials}</span>
          <div className="thread__author">
            <b>{qa.answer.author}</b>
            <span className="thread__date">{qa.answer.date}</span>
          </div>
          <div className="thread__body">
            {qa.answer.paragraphs.map((paragraph) => (
              <p className="thread__text" key={paragraph}>
                {paragraph}
              </p>
            ))}
            <ThreadActions helpful={qa.answer.helpful} report={qa.report} withReply />
          </div>
        </div>
      </div>

      <span className="thread__reply-btn">{qa.reply}</span>

      {showStrip && (
        <div className="strip">
          <span>{qa.strip.text}</span>
          <span className="strip__link">{qa.strip.link}</span>
        </div>
      )}
    </div>
  );
}
