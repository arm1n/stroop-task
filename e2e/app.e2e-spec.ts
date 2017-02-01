import { StroopTaskPage } from './app.po';

describe('stroop-task App', function() {
  let page: StroopTaskPage;

  beforeEach(() => {
    page = new StroopTaskPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
