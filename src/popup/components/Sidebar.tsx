import * as React from 'react';
import SaveTestButton from './SaveTestButton';
import RunTestButton from "./RunTestButton";

export interface SidebarProps {
  recStatus: string;
  saveTest: () => Promise<void>;
  runLastRecordedTest: () => Promise<void>;
}
export default ({ recStatus, saveTest, runLastRecordedTest }: SidebarProps) => (
  <div id="sidebar">
    <h1>Save test</h1>
    <label>Test name</label>
    <input type="text" id="name" name="name" required />
    <label>Description</label>
    <textarea id="description" name="description" required></textarea>
    <div>
      {<SaveTestButton saveTest={saveTest} />}
      {<RunTestButton runLastRecordedTest={runLastRecordedTest} />}
    </div>
  </div>
);
