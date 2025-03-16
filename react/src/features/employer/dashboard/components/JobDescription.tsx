import React from "react";

const JobDescription: React.FC<{ content: string }> = ({ content }) => {
  const addClassToTags = (htmlString: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    doc.querySelectorAll("p").forEach((p) => {
      p.classList.add("text-textGray", "text-sm", "sm:max-w-2xl");
    });

    doc.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((header) => {
      header.classList.add("font-medium", "text-textBlack", "text-md");
    });

    return doc.body.innerHTML;
  };

  const processedContent = addClassToTags(content);
  return (
    <div
      className="grid grid-cols gap-y-3"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    ></div>
  );
};

export default JobDescription;
