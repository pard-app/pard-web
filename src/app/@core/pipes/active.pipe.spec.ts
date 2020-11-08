import { ActivePipe } from './active.pipe';

describe('ActivePipe', () => {
  it('create an instance', () => {
    const pipe = new ActivePipe();
    expect(pipe).toBeTruthy();
  });
});
