export const toolbarConfig = {
  headerName: 'Create Question Set',
  title: 'Question Collection',
  buttons: [{
    telemetryId: 'save_as_draft',
    telemetrySubtype: 'submit',
    name: 'Save as draft',
    type: 'saveCollection',
    buttonType: 'button',
    style: 'sb-btn sb-btn-normal sb-btn-outline-primary mr-10',
  },
  {
    telemetryId: 'submit',
    telemetrySubtype: 'submit',
    name: 'Submit',
    type: 'submitCollection',
    buttonType: 'button',
    style: 'sb-btn sb-btn-normal sb-btn-primary',
    slot: `<i class="trash alternate outline icon"></i>`
  }
  ]
};

export const questionToolbarConfig = {
  headerName: 'Edit Question',
  title: 'Q1 | MCQ',
  buttons: [{
    telemetryId: 'preview',
    telemetrySubtype: 'launch',
    name: 'Preview',
    type: 'previewContent',
    buttonType: 'button',
    style: 'sb-btn sb-btn-normal sb-btn-outline-primary mr-10',
    slot: `icon eye`
  }, {
    telemetryId: 'cancel',
    telemetrySubtype: 'launch',
    name: 'Cancel',
    type: 'cancelContent',
    buttonType: 'button',
    style: 'sb-btn sb-btn-normal sb-btn-outline-primary mr-10',
  },
  {
    telemetryId: 'save',
    telemetrySubtype: 'submit',
    name: 'Save',
    type: 'saveContent',
    buttonType: 'button',
    style: 'sb-btn sb-btn-normal sb-btn-primary'
  }
  ]
};


export const templateList = [
    { type : 'MCQ'},
    { type : 'Subjective'}
];

export const editorConfig = {
    nodeDisplayCriteria: {
      contentType: ['QuestionSet', 'Question']
    },
    keywordsLimit: 500,
    editorConfig: {
      rules: {
        levels: 2,
        objectTypes: [
          {
            type: 'QuestionSet',
            label: 'QuestionSet',
            isRoot: true,
            editable: true,
            childrenTypes: [
              'QuestionSet', 'Question'
            ],
            addType: 'Editor',
            iconClass: 'fa fa-book'
          },
          {
            type: 'Question',
            label: 'Question',
            isRoot: false,
            editable: true,
            childrenTypes: [],
            addType: 'Editor',
            iconClass: 'fa fa-file-o'
          }
        ]
      },
      mode: 'Edit'
    }
};

export const questionEditorConfig = {
    config: {
      tenantName: '',
      assetConfig: {
        image: {
          size: '50',
          accepted: 'jpeg, png, jpg'
        },
        video: {
          size: '50',
          accepted: 'pdf, mp4, webm, youtube'
        }
      },
      solutionType: [
        'Video',
        'Text & image'
      ],
      'No of options': 4,
      questionCategory: [
        'vsa',
        'sa',
        'ls',
        'mcq',
        'curiosity'
      ],
      resourceTitleLength: '200'
    },
    channel: 'sunbird'
};


export const collectionTreeNodes = {
  totalQuestions: 0,
  code: 'do_113170109787922432162',
  allowSkip: 'Yes',
  language: [
      'English'
  ],
  mimeType: 'application/vnd.ekstep.questionset',
  showHints: 'Yes',
  createdOn: '2020-12-11T09:36:57.472+0000',
  objectType: 'QuestionSet',
  primaryCategory: 'Practice Question Set',
  children: [
      {
          parent: 'do_113170109787922432162',
          identifier: 'do_113170079485313024155',
          lastStatusChangedOn: '2020-12-11T08:35:18.423+0000',
          code: 'question.code',
          visibility: 'Public',
          consumerId: 'fa13b438-8a3d-41b1-8278-33b0c50210e4',
          index: 1,
          language: [
              'English'
          ],
          mimeType: 'application/vnd.ekstep.qml-archive',
          languageCode: [
              'en'
          ],
          createdOn: '2020-12-11T08:35:18.423+0000',
          version: 1,
          objectType: 'Question',
          versionKey: '1607675718423',
          depth: 1,
          primaryCategory: 'Practice Question Set',
          name: 'question_1',
          lastUpdatedOn: '2020-12-11T08:35:18.423+0000',
          status: 'Draft'
      },
      {
          parent: 'do_113170109787922432162',
          identifier: 'do_113170172989734912172',
          lastStatusChangedOn: '2020-12-11T11:45:32.537+0000',
          code: 'question.code',
          visibility: 'Public',
          consumerId: 'fa13b438-8a3d-41b1-8278-33b0c50210e4',
          index: 2,
          language: [
              'English'
          ],
          mimeType: 'application/vnd.ekstep.qml-archive',
          languageCode: [
              'en'
          ],
          createdOn: '2020-12-11T11:45:32.537+0000',
          version: 1,
          objectType: 'Question',
          versionKey: '1607687132537',
          depth: 1,
          primaryCategory: 'Practice Question Set',
          name: 'question_2',
          lastUpdatedOn: '2020-12-11T11:45:32.537+0000',
          status: 'Draft'
      },
      {
          parent: 'do_113170109787922432162',
          identifier: 'do_113170173081952256173',
          lastStatusChangedOn: '2020-12-11T11:45:43.794+0000',
          code: 'question.code',
          visibility: 'Public',
          consumerId: 'fa13b438-8a3d-41b1-8278-33b0c50210e4',
          index: 3,
          language: [
              'English'
          ],
          mimeType: 'application/vnd.ekstep.qml-archive',
          languageCode: [
              'en'
          ],
          createdOn: '2020-12-11T11:45:43.794+0000',
          version: 1,
          objectType: 'Question',
          versionKey: '1607687143794',
          depth: 1,
          primaryCategory: 'Practice Question Set',
          name: 'question_3',
          lastUpdatedOn: '2020-12-11T11:45:43.794+0000',
          status: 'Draft'
      },
      {
          parent: 'do_113170109787922432162',
          identifier: 'do_113170173148307456174',
          lastStatusChangedOn: '2020-12-11T11:45:51.894+0000',
          code: 'question.code',
          visibility: 'Public',
          consumerId: 'fa13b438-8a3d-41b1-8278-33b0c50210e4',
          index: 4,
          language: [
              'English'
          ],
          mimeType: 'application/vnd.ekstep.qml-archive',
          languageCode: [
              'en'
          ],
          createdOn: '2020-12-11T11:45:51.894+0000',
          version: 1,
          objectType: 'Question',
          versionKey: '1607687151894',
          depth: 1,
          primaryCategory: 'Practice Question Set',
          name: 'question_4',
          lastUpdatedOn: '2020-12-11T11:45:51.894+0000',
          status: 'Draft'
      },
      {
          parent: 'do_113170109787922432162',
          identifier: 'do_113170173243678720175',
          lastStatusChangedOn: '2020-12-11T11:46:03.536+0000',
          code: 'question.code',
          visibility: 'Public',
          consumerId: 'fa13b438-8a3d-41b1-8278-33b0c50210e4',
          index: 5,
          language: [
              'English'
          ],
          mimeType: 'application/vnd.ekstep.qml-archive',
          languageCode: [
              'en'
          ],
          createdOn: '2020-12-11T11:46:03.536+0000',
          version: 1,
          objectType: 'Question',
          versionKey: '1607687163536',
          depth: 1,
          primaryCategory: 'Practice Question Set',
          name: 'question_5',
          lastUpdatedOn: '2020-12-11T11:46:03.536+0000',
          status: 'Draft'
      },
      {
          parent: 'do_113170109787922432162',
          identifier: 'do_1131743465165373441141',
          lastStatusChangedOn: '2020-12-17T09:16:36.258+0000',
          code: '3679dad3-2e95-3ee2-c0cb-42faa0fc9e4d',
          visibility: 'Public',
          consumerId: 'fa13b438-8a3d-41b1-8278-33b0c50210e4',
          channel: '01307938306521497658',
          index: 6,
          language: [
              'English'
          ],
          mimeType: 'application/vnd.ekstep.qml-archive',
          languageCode: [
              'en'
          ],
          createdOn: '2020-12-17T09:16:36.258+0000',
          version: 1,
          objectType: 'Question',
          versionKey: '1609145266858',
          depth: 1,
          primaryCategory: 'Practice Question Set',
          name: 'untitled SA',
          lastUpdatedOn: '2020-12-28T08:47:46.858+0000',
          status: 'Draft'
      }
  ],
  lastUpdatedOn: '2020-12-30T11:17:57.088+0000',
  showSolutions: 'Yes',
  identifier: 'do_113170109787922432162',
  lastStatusChangedOn: '2020-12-17T06:37:53.905+0000',
  requiresSubmit: 'Yes',
  visibility: 'Public',
  maxQuestions: 0,
  summaryType: 'Complete',
  consumerId: 'fa13b438-8a3d-41b1-8278-33b0c50210e4',
  childNodes: [
      'do_113170173243678720175',
      'do_113170172989734912172',
      'do_113170079485313024155',
      'do_1131743465165373441141',
      'do_113170173148307456174',
      'do_113170173081952256173'
  ],
  setType: 'materialised',
  languageCode: [
      'en'
  ],
  version: 1,
  versionKey: '1609327077088',
  showFeedback: 'Yes',
  prevState: 'Draft',
  depth: 0,
  name: 'Question Collection',
  navigationMode: 'linear',
  shuffle: 'Yes',
  status: 'Review'
};
