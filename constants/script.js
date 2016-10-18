export const SCRIPT = {
  HELLO: {
    messages: ['Hey, want to learn about something?'],
    get branches () { return [SCRIPT.YES_TO_LEARN]; },
  },
  YES_TO_LEARN: {
    messages: ['Yes please'],
    icon: 'icon-yes',
    get nextDialogOption () { return SCRIPT.CHOOSE_NAME; },
  },
  CHOOSE_NAME: {
    messages: ['Great! Before we start, what should I call you?'],
    get branches () { return [SCRIPT.LEARNBOT_INTRO]; },
  },
  LEARNBOT_INTRO: {
    messages: (username) => {
      return [
        `Thanks ${username} — I'm Learnbot.`,
        'Just finding something for you to learn about.',
      ];
    },
    get nextDialogOption () { return SCRIPT.SUGGEST_TOPIC; },
  },
  SUGGEST_TOPIC: {
    get branches () { return [SCRIPT.YES_TO_SUGGEST_TOPIC, SCRIPT.NO_TO_SUGGEST_TOPIC]; },
  },
  YES_TO_SUGGEST_TOPIC: {
    messages: ['Yes please'],
    icon: 'icon-yes',
    get nextDialogOption () { return SCRIPT.ACCEPT_TOPIC; },
  },
  NO_TO_SUGGEST_TOPIC: {
    messages: ['Not right now'],
    icon: 'icon-no',
    get nextDialogOption () { return SCRIPT.REJECT_TOPIC; },
  },
  REJECT_TOPIC: {
    messages: ['OK, no problem.'],
    get nextDialogOption () { return SCRIPT.SUGGEST_OTHER_TOPIC; },
  },
  ACCEPT_TOPIC: {
    messages: ['[show wiki webview]'],
    get nextDialogOption () { return SCRIPT.QUESTION_INTEREST; },
  },
  QUESTION_INTEREST: {
    messages: ['Did you find that interesting?'],
    get branches () { return [SCRIPT.YES_TO_INTEREST, SCRIPT.NO_TO_INTEREST]; },
  },
  NO_TO_INTEREST: {
    messages: ['Not really'],
    icon: 'icon-no',
    get nextDialogOption () { return SCRIPT.REJECT_INTEREST; },
  },
  YES_TO_INTEREST: {
    messages: ['I did!'],
    icon: 'icon-yes',
    get nextDialogOption () { return SCRIPT.ACCEPT_INTEREST; },
  },
  REJECT_INTEREST: {
    messages: ['OK, I\'ll remember that.'],
    get nextDialogOption () { return SCRIPT.SUGGEST_OTHER_TOPIC; },
  },
  ACCEPT_INTEREST: {
    messages: ['Great, I\'ll remember that.'],
    get nextDialogOption () { return SCRIPT.SUGGEST_OTHER_TOPIC; },
  },
  SUGGEST_OTHER_TOPIC: {
    messages: ['Let me find something else for you.'],
    get nextDialogOption () { return SCRIPT.SUGGEST_TOPIC; },
  },
};
