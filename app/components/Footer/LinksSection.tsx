import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useQuery } from "@apollo/client";
import { GET_FEATURES } from "@/app/graphql/queries";

type TagData = {
  tags: string[];
};

type QueryData = {
  tagsCollection: {
    items: TagData[];
  };
};

type QueryError = {
  message: string;
};

const LinksSection: React.FC = () => {
  const { loading, error, data } = useQuery<QueryData, QueryError>(GET_FEATURES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  const tags: string[] = data?.tagsCollection?.items[0]?.tags.map((tag) => tag.toUpperCase()) || [];


  const groupedTags: string[][] = tags.reduce<string[][]>((acc, tag, index) => {
    const sectionIndex = Math.floor(index / 5); // Grouping every 5 items
    acc[sectionIndex] = acc[sectionIndex] || [];
    acc[sectionIndex].push(tag);
    return acc;
  }, []);

  return (
    <>
      {groupedTags.map((group, index) => (
        <section className="flex flex-col mt-5" key={index}>
          {group.map((tag, idx) => (
            <Link
              href="#"
              key={idx}
              className={cn("uppercase text-black/60 text-sm md:text-base mb-4 w-fit")}
            >
              {tag}
            </Link>
          ))}
        </section>
      ))}
    </>
  );
};

export default LinksSection;