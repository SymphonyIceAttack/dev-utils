"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ArticleHeaderProps {
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  featured?: boolean;
}

export function ArticleHeader({
  title,
  description,
  author,
  date,
  readTime,
  tags,
  image,
  featured = false,
}: ArticleHeaderProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="mb-12"
      variants={staggerChildren}
      initial="initial"
      animate="animate"
    >
      {/* Cover Image */}
      <motion.div
        className="aspect-video bg-muted relative overflow-hidden rounded-2xl mb-8"
        variants={fadeInUp}
      >
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-accent text-accent-foreground rounded-full">
              Featured Guide
            </Badge>
          </div>
        )}
      </motion.div>

      {/* Article Info */}
      <motion.div variants={fadeInUp} className="space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          {title}
        </h1>

        {/* Description */}
        <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">
          {description}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-4 border-t">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
