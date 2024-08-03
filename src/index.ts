import { Text } from "havarotjs";
import { remove, RemoveOptions } from "./remove";
import {
  ClusterCallback,
  ClusterFeature,
  HebrewFeature,
  PassThrough,
  SBL,
  Schema,
  SyllableCallback,
  SyllableFeature,
  SylOpts,
  WordCallback,
  WordFeature
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
