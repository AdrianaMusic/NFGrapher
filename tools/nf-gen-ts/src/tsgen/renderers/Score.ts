// Copyright (c) 2018 Spotify AB.
// 
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
// 
//   http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
import { OutputFile } from '../../interfaces';
import { ContractDef } from '../../defs.generated';
import { source } from 'common-tags';

export default function render(contractDef: ContractDef): OutputFile {
  const filepath = 'score/Score.ts';
  const content = /* prettier-ignore */ source`
    import Graph from './Graph';
    import { Score as IScore } from './interfaces';

    class Score implements IScore {
      constructor(
        public graph: Graph = new Graph(),
        public version: string = '${contractDef.version}'
      ) {}
      public static from(score: IScore): Score {
        return new Score(Graph.from(score.graph), score.version);
      }
    }

    export default Score;
  `;
  return { filepath, content };
}
