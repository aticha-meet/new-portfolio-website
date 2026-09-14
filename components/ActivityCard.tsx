import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { images } from "@/config/images";
import type { Activity } from "@/lib/activities";

export function ActivityCard({ activity }: { activity: Activity }) {
  const cover = images[activity.image];
  return (
    <article
      id={activity.id}
      className="activity-card glass-box h-full overflow-hidden"
    >
      <figure className="activity-cover">
        <Image
          src={cover.src}
          alt={cover.alt}
          sizes="(max-width: 767px) 90vw, (max-width: 1200px) 45vw, 560px"
          placeholder={cover.src.blurDataURL ? "blur" : "empty"}
        />
        <figcaption>
          {"placeholder" in cover && cover.placeholder
            ? "Concept illustration · "
            : ""}
          {activity.caption}
        </figcaption>
      </figure>
      <div className="activity-content">
        <p className="activity-date">{activity.date}</p>
        <h3>{activity.title}</h3>
        <p className="activity-organization">{activity.organization}</p>
        <p className="activity-role">{activity.role}</p>
        <p className="activity-description">{activity.description}</p>
        <ul
          className="activity-highlights flex flex-wrap gap-2"
          aria-label="Highlights"
        >
          {activity.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        {activity.gallery && (
          <details className="activity-gallery">
            <summary>
              More moments <span>+{activity.gallery.length} photo</span>
              <ChevronDown size={17} aria-hidden="true" />
            </summary>
            <div className="grid gap-4">
              {activity.gallery.map((photo) => (
                <figure key={photo.image}>
                  <Image
                    src={images[photo.image].src}
                    alt={images[photo.image].alt}
                    sizes="(max-width: 767px) 80vw, 500px"
                  />
                  <figcaption>{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          </details>
        )}
      </div>
    </article>
  );
}
