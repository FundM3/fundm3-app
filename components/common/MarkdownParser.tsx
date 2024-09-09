import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface Parser {
  markdownText: string;
}

const MarkdownParser: React.FC<Parser> = ({ markdownText }) => {
  return (
    <ReactMarkdown
      children={markdownText}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-2xl font-bold mb-4" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-xl font-semibold mb-3" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-lg font-medium mb-2" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="text-md font-medium mb-2" {...props} />
        ),
        h5: ({ node, ...props }) => (
          <h5 className="text-sm font-medium mb-2" {...props} />
        ),
        h6: ({ node, ...props }) => (
          <h6 className="text-xs font-medium mb-2" {...props} />
        ),

        p: ({ node, ...props }) => (
          <p className="mb-2 leading-relaxed" {...props} />
        ),

        li: ({ node, ...props }) => (
          <li className="ml-6 list-disc" {...props} />
        ),

        table: ({ node, ...props }) => (
          <table
            className="table-auto border-collapse border border-gray-300 w-full"
            {...props}
          />
        ),
        th: ({ node, ...props }) => (
          <th className="border border-gray-300 p-2 bg-gray-100" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="border border-gray-300 p-2" {...props} />
        ),

        pre: ({ node, ...props }) => (
          <pre
            className="bg-gray-800 text-white p-4 rounded overflow-x-auto"
            {...props}
          />
        ),

        code: ({ node, className, children, ...props }) => (
          <code
            className={`bg-gray-800 text-white p-1 rounded ${className}`}
            {...props}
          >
            {children}
          </code>
        ),

        a: ({ node, ...props }) => (
          <a
            className="text-blue-500 underline hover:text-blue-700"
            {...props}
          />
        ),

        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-gray-300 pl-4 italic text-gray-600"
            {...props}
          />
        ),

        ol: ({ node, ...props }) => (
          <ol className="list-decimal ml-6" {...props} />
        ),

        ul: ({ node, ...props }) => (
          <ul className="list-disc ml-6" {...props} />
        ),

        hr: ({ node, ...props }) => (
          <hr className="border-t border-gray-200 my-4" {...props} />
        ),

        img: ({ node, ...props }) => (
          <img
            className="rounded"
            style={{ maxWidth: "100%", height: "auto" }}
            {...props}
          />
        ),
      }}
    />
  );
};

export default MarkdownParser;
