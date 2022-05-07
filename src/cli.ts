#!/usr/bin/env node

import { remove, Schema, sequence, Text, transliterate } from "./index";
import { program } from "commander";

program.name("string-util").description("CLI to some JavaScript string utilities").version("0.8.0");

program.parse();
