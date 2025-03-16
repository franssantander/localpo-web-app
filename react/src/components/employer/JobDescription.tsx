import React, { useState } from "react";

const JobDescription: React.FC<{ content: string }> = ({
  content,
  isOpen,
  close,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const addClassToTags = (htmlString: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    doc.querySelectorAll("p").forEach((p) => {
      p.classList.add("text-textGray", "text-sm", "sm:max-w-3xl", "leading-6");
    });

    doc.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((header) => {
      header.classList.add("font-medium", "text-textBlack", "text-md");
    });

    doc.querySelectorAll("strong").forEach((header) => {
      header.classList.add("font-semibold", "text-textBlack", "text-md");
    });

    return doc.body.innerHTML;
  };

  const truncateHtml = (htmlString: string, wordLimit = 70): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    let wordCount = 0;
    const elementsToRemove: ChildNode[] = [];

    doc.body.childNodes.forEach((node) => {
      if (wordCount >= wordLimit) {
        elementsToRemove.push(node);
      } else {
        const text = node.textContent || "";
        const words = text.split(/\s+/).filter((word) => word.length > 0);
        wordCount += words.length;
      }
    });

    elementsToRemove.forEach((node) => node.remove());

    if (wordCount >= wordLimit) {
      const lastParagraph = doc.body.lastChild;
      if (lastParagraph) {
        lastParagraph.textContent += " ...";
      }
    }

    return doc.body.innerHTML;
  };

  const processedContent = addClassToTags(content);
  const truncatedContent = addClassToTags(truncateHtml(content));

  return (
    <div className="grid grid-cols gap-y-3">
      <div
        dangerouslySetInnerHTML={{
          __html: isOpen ? processedContent : truncatedContent,
        }}
      ></div>
    </div>
  );
};

export default JobDescription;
