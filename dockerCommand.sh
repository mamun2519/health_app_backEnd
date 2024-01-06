#!/bin/bash
npm prisma:migrate
npm prisma:generate
node dist/server.js