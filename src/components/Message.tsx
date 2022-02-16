import { useCallback, useState } from "react";

export const Message: React.FC<{
  title: string;
  content?: string;
  failure?: true;
  success?: true;
}> = ({ title, content, children, success }) => {
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
          {hasMore && <a onClick={toggle}>Details</a>}
        </div>
        {expanded && hasMore && (
          <div className="body">
            {content}
            {children}
          </div>
        )}
      </article>
    </>
  );
};
