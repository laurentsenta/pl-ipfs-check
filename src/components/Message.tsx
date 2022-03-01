import { useCallback, useState } from "react";

export const Message: React.FC<{
  title: string;
  content?: string;
  failure?: true;
  success?: true;
  rawData?: unknown;
}> = ({ title, content, children, success, rawData }) => {
  const status = success ? "is-success" : "is-warning";
  const prefix = success ? "✔" : "❌";

  const [expanded, setExpanded] = useState(false);

  const toggle = useCallback(() => {
    setExpanded((x) => !x);
  }, [setExpanded]);

  const hasMore = content || children;

  return (
    <>
      <article className={`notification ${status}`}>
        <div className="header">
          <p>
            {prefix} {title}
          </p>
          {!!rawData && <a onClick={toggle}>Details</a>}
        </div>
        {expanded && rawData && (
          <pre>{JSON.stringify(rawData, undefined, 2)}</pre>
        )}
        {hasMore && (
          <div className="body" style={{ overflow: "scroll" }}>
            {content}
            {children}
          </div>
        )}
      </article>
    </>
  );
};
