import { Text } from "havarotjs";
import type { RemoveOptions } from "./remove";
import { remove } from "./remove";
import type {
  ClusterCallback,
  ClusterFeature,
  HebrewFeature,
  PassThrough,
  SyllableCallback,
  SyllableFeature,
  SylOpts,
  WordCallback,
  WordFeature
} from "./schema";
import {
  SBL,
  Schema
} from "./schema";
import { sequence } from "./sequence";
import { transliterate } from "./transliterate";

export { remove, SBL, Schema, sequence, Text, transliterate };
export type {
  ClusterCallback,
  ClusterFeature,
  HebrewFeature,
  PassThrough,
  RemoveOptions,
  SyllableCallback,
  SyllableFeature,
  SylOpts,
  WordCallback,
  WordFeature
};
