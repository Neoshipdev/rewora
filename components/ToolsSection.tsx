import { hotspotVisual } from '@/lib/assets';
import AiSummary from '@/components/AiSummary';
import BiCard from '@/components/BiCard';
import ForumThread from '@/components/ForumThread';
import GoogleShopping from '@/components/GoogleShopping';
import HotspotStage from '@/components/HotspotStage';
import ReviewsWidget from '@/components/ReviewsWidget';
import SmartSearch from '@/components/SmartSearch';
import VideoReviews from '@/components/VideoReviews';
import { subfeatureIcons } from '@/components/icons';
import { features as featuresData, featuresIntro as featuresIntroData } from '@/lib/features';
import type { Lang } from '@/lib/i18n';
import { hotspots as hotspotsData } from '@/lib/panel-data';
import { tDeep } from '@/lib/t';

/** Text odrážky s voliteľne zvýraznenou časťou. */
function Zvyraznene({ text, cast }: { text: string; cast?: string }) {
  if (!cast || !text.includes(cast)) return <>{text}</>;
  const [pred, ...zvysok] = text.split(cast);
  return (
    <>
      {pred}
      <strong className="subfeature__mark">{cast}</strong>
      {zvysok.join(cast)}
    </>
  );
}

/** Ukážka vpravo v riadku nástroja — podľa dizajnu 1c. */
function ToolDemo({ num, lang }: { num: string; lang: Lang }) {
  const hotspots = tDeep(hotspotsData, lang);

  if (num === '01') {
    return (
      <div className="tool-row__demo demo demo--widget">
        <ReviewsWidget lang={lang} />
      </div>
    );
  }
  if (num === '02') {
    return (
      <div className="tool-row__demo demo demo--widget">
        <VideoReviews lang={lang} />
      </div>
    );
  }
  if (num === '03') {
    return (
      <div className="tool-row__demo demo demo--widget">
        <GoogleShopping lang={lang} />
      </div>
    );
  }
  if (num === '04') {
    return (
      <div className="tool-row__demo demo demo--thread">
        <ForumThread showStrip={false} lang={lang} />
      </div>
    );
  }
  if (num === '05') {
    return (
      <div className="tool-row__demo demo demo--widget">
        <AiSummary lang={lang} />
      </div>
    );
  }
  if (num === '06') {
    return (
      <div className="tool-row__demo">
        <HotspotStage
          height={220}
          caption={hotspots.caption}
          image={hotspotVisual}
          dots={[
            { left: '28%', top: '40%' },
            { left: '66%', top: '28%' },
          ]}
          bubble={hotspots.bubble}
          bubbleWidth={210}
          lang={lang}
        />
      </div>
    );
  }
  if (num === '08') {
    return (
      <div className="tool-row__demo demo demo--widget">
        <SmartSearch lang={lang} />
      </div>
    );
  }
  return (
    <div className="tool-row__demo demo demo--bi">
      <BiCard compact lang={lang} />
    </div>
  );
}

/**
 * Sekcia „Nástroje“ — osem widgetov s ukážkami. Používa ju homepage
 * aj samostatná stránka Funkcie, tam už bez vlastného nadpisu.
 */
export default function ToolsSection({
  lang,
  withHeading = true,
}: {
  lang: Lang;
  withHeading?: boolean;
}) {
  const features = tDeep(featuresData, lang);
  const featuresIntro = tDeep(featuresIntroData, lang);

  return (
    <section className="section" id="features">
      <div className="container container--tools">
        {withHeading && (
          <div className="tools__head">
            <span className="eyebrow">{featuresIntro.eyebrow}</span>
            <h2 className="h2">{featuresIntro.title}</h2>
            <p style={{ maxWidth: 720, marginTop: 6, fontSize: 16.1, color: 'var(--ink-600)' }}>
              {featuresIntro.lead}
            </p>
          </div>
        )}

        {features.map((feature) => (
          <div
            className={`tool-row ${Number(feature.num) % 2 === 0 ? 'tool-row--tint' : ''}`}
            key={feature.num}
          >
            <span className="tool-row__num">{feature.num}</span>
            <div className="tool-row__copy">
              <h3 className="tool-row__name">{feature.name}</h3>
              {feature.short && <p className="tool-row__text">{feature.short}</p>}
              <p className="tool-row__long">{feature.long}</p>
            </div>
            <ToolDemo num={feature.num} lang={lang} />
            <div className={`subfeatures subfeatures--${feature.items.length}`}>
              {feature.items.map((item) => {
                const Icon = subfeatureIcons[item.icon];
                return (
                  <div className="subfeature" key={item.title}>
                    <span className="subfeature__icon" aria-hidden>
                      <Icon size={26} />
                    </span>
                    <span className="subfeature__title">{item.title}</span>
                    <span className="subfeature__text">
                      <Zvyraznene text={item.text} cast={item.highlight} />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
