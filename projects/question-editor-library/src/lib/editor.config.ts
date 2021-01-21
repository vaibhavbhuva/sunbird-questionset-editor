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
    display: 'block'
  },
  {
    telemetryId: 'submit',
    telemetrySubtype: 'submit',
    name: 'Submit',
    type: 'submitCollection',
    buttonType: 'button',
    style: 'sb-btn sb-btn-normal sb-btn-primary',
    slot: `<i class="trash alternate outline icon"></i>`,
    display: 'block'
  }
  ]
};

export const reviewerToolbarConfig = {
  headerName: 'Review Question Set',
  title: 'Question Collection',
  buttons: [{
    telemetryId: 'reject',
    telemetrySubtype: 'submit',
    name: 'Reject',
    type: 'rejectCollection',
    buttonType: 'button',
    style: 'sb-btn sb-btn-outline-error sb-btn-normal ripple mr-10',
    display: 'block'
  },
  {
    telemetryId: 'publish',
    telemetrySubtype: 'submit',
    name: 'Publish',
    type: 'publishCollection',
    buttonType: 'button',
    style: 'sb-btn sb-btn-secondary sb-btn-normal ripple',
    display: 'block'
  }
  ]
};

export const questionToolbarConfig = {
  headerName: 'Back',
  title: '',
  buttons: [
    {
      telemetryId: 'edit',
      telemetrySubtype: 'launch',
      name: 'Edit',
      type: 'editContent',
      buttonType: 'button',
      style: 'sb-btn sb-btn-normal sb-btn-outline-primary mr-10',
      slot: `icon edit`,
      display: 'none'
    },
    {
    telemetryId: 'preview',
    telemetrySubtype: 'launch',
    name: 'Preview',
    type: 'previewContent',
    buttonType: 'button',
    style: 'sb-btn sb-btn-normal sb-btn-outline-primary mr-10',
    slot: `icon eye`,
    display: 'block'
  }, {
    telemetryId: 'cancel',
    telemetrySubtype: 'launch',
    name: 'Cancel',
    type: 'cancelContent',
    buttonType: 'button',
    style: 'sb-btn sb-btn-normal sb-btn-outline-primary mr-10',
    display: 'block'
  },
  {
    telemetryId: 'save',
    telemetrySubtype: 'submit',
    name: 'Save',
    type: 'saveContent',
    buttonType: 'button',
    style: 'sb-btn sb-btn-normal sb-btn-primary',
    display: 'block'
  }
  ]
};

// TODO: rethink this
export const editorConfig = {
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
          },
        ]
      }
    }
};

// TODO: rethink this
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

export const formConfig = [
  {
      code: 'name',
      dataType: 'text',
      description: 'Name of the content',
      editable: true,
      inputType: 'text',
      label: 'Title',
      name: 'Title',
      placeholder: 'Title',
      renderingHints: {class: 'sb-g-col-lg-1'},
      required: true,
      visible: true,
      validations: [{
          type: 'max',
          value: '120',
          message: 'Input is Exceeded'
      }, {
          type: 'required',
          message: 'Title is required'
      }]
  },
  {
      code: 'description',
      dataType: 'text',
      description: 'Description of the content',
      editable: true,
      inputType: 'textarea',
      label: 'Description',
      name: 'Description',
      placeholder: 'Description',
      renderingHints: {class: 'sb-g-col-lg-1'},
      required: false,
      visible: true,
      validations: [{
          type: 'max',
          value: '120',
          message: 'Input is Exceeded'
      }, {
          type: 'required',
          message: 'Title is required'
      }]
  },
  {
      code: 'keywords',
      visible: true,
      editable: true,
      dataType: 'list',
      name: 'Keywords',
      renderingHints: {class: 'sb-g-col-lg-1'},
      index: 3,
      description: 'Keywords for the content',
      inputType: 'keywords',
      label: 'keywords',
      placeholder: 'Enter Keywords',
      required: false,
      section: {
        index: 1,
        name: ''
      },
      validations: [{
        type: 'required',
        message: 'Keyword is required'
      }]
    },
    {
      code: 'primaryCategory',
      dataType: 'text',
      description: 'Type',
      editable: false,
      index: 4,
      renderingHints: {class: 'sb-g-col-lg-1'},
      inputType: 'text',
      label: 'Type',
      name: 'Type',
      placeholder: '',
      required: false,
      visible: true,
      section: {
        index: 2,
        name: ''
      }
    },
    {
      code: 'additionalCategories',
      dataType: 'list',
      description: 'Additonal Category of the Content',
      editable: true,
      index: 5,
      inputType: 'nestedselect',
      label: 'Additional Category',
      name: 'Additional Category',
      placeholder: 'Select Additional Category',
      renderingHints: {class: 'sb-g-col-lg-1'},
      default: '',
      range: [
          {
            value: 'Classroom Teaching Video',
            label: 'Classroom Teaching Video'
          },
          {
            value: 'Concept Map',
            label: 'Concept Map'
          },
          {
            value: 'Curiosity Question Set',
            label: 'Curiosity Question Set'
          },
          {
            value: 'Textbook',
            label: 'Textbook'
          },
          {
            value: 'Experiential Resource',
            label: 'Experiential Resource'
          },
          {
            value: 'Explanation Video',
            label: 'Explanation Video'
          },
          {
            value: 'Focus Spot',
            label: 'Focus Spot'
          },
          {
            value: 'Learning Outcome Definition',
            label: 'Learning Outcome Definition'
          },
          {
            value: 'Marking Scheme Rubric',
            label: 'Marking Scheme Rubric'
          },
          {
            value: 'Pedagogy Flow',
            label: 'Pedagogy Flow'
          },
          {
            value: 'Lesson Plan',
            label: 'Lesson Plan'
          },
          {
            value: 'Previous Board Exam Papers',
            label: 'Previous Board Exam Papers'
          },
          {
            value: 'TV Lesson',
            label: 'TV Lesson'
          }
      ],
      required: false,
      visible: true,
      section: {
        index: 2,
        name: ''
      }
    },
    {
      code: 'board',
      default: '',
      visible: true,
      depends: [],
      editable: true,
      dataType: 'text',
      renderingHints: {class: 'sb-g-col-lg-1'},
      description: 'Board',
      index: 6,
      label: 'Board/Syllabus',
      required: false,
      name: 'Board/Syllabus',
      inputType: 'select',
      placeholder: 'Select Board/Syllabus',
      section: {
        index: 3,
        name: ''
      },
      validations: [{
        type: 'required',
        message: 'Board is required'
      }]
    }, {
      code: 'medium',
      visible: true,
      depends: ['board'],
      editable: true,
      default: '',
      dataType: 'list',
      renderingHints: {class: 'sb-g-col-lg-1'},
      description: '',
      index: 7,
      label: 'Medium',
      required: false,
      name: 'Medium',
      inputType: 'select',
      placeholder: 'Select Medium',
      section: {
        index: 3,
        name: ''
      },
      validations: [{
        type: 'required',
        message: 'Medium is required'
      }]
    }, {
      code: 'gradeLevel',
      visible: true,
      depends: ['board', 'medium'],
      editable: true,
      default: '',
      dataType: 'list',
      renderingHints: {class: 'sb-g-col-lg-1'},
      description: 'Class',
      index: 8,
      label: 'Class',
      required: false,
      name: 'Class',
      inputType: 'select',
      placeholder: 'Select Class',
      section: {
        index: 3,
        name: ''
      }
    }, {
      code: 'subject',
      visible: true,
      depends: ['board', 'medium', 'gradeLevel'],
      editable: true,
      default: '',
      dataType: 'list',
      renderingHints: {class: 'sb-g-col-lg-1'},
      description: '',
      index: 9,
      label: 'Subject',
      required: false,
      name: 'Subject',
      inputType: 'select',
      placeholder: 'Select Subject',
      section: {
        index: 3,
        name: ''
      }
    },
    {
      code: 'topic',
      visible: true,
      editable: true,
      dataType: 'list',
      depends: ['board', 'medium', 'gradeLevel', 'subject'],
      default: '',
      renderingHints: {class: 'sb-g-col-lg-1'},
      name: 'Topic',
      description: 'Choose a Topics',
      index: 11,
      inputType: 'topicselector',
      label: 'Topics',
      placeholder: 'Choose Topics',
      required: false,
      validations: [{
        type: 'required',
        message: 'Topic is required'
      }]
    },
  {
      code: 'audience',
      dataType: 'list',
      description: 'Audience',
      editable: true,
      inputType: 'select',
      label: 'Audience',
      name: 'Audience',
      placeholder: 'Select Audience',
      renderingHints: {class: 'sb-g-col-lg-1'},
      required: false,
      visible: true,
      range: ['Student', 'Teacher', 'Administrator'],
  },
  {
      code: 'showFeedback',
      dataType: 'text',
      description: 'Show Feedback',
      editable: true,
      default: '',
      index: 5,
      inputType: 'checkbox',
      label: 'Show Feedback',
      name: 'showFeedback',
      placeholder: 'Show Feedback',
      renderingHints: {class: 'sb-g-col-lg-1'},
      required: false,
      visible: true
  },
  {
      code: 'shuffle',
      dataType: 'text',
      description: 'Shuffle Questions',
      editable: true,
      default: '',
      index: 5,
      inputType: 'checkbox',
      label: 'Shuffle Questions',
      name: 'Shuffle Questions',
      placeholder: 'Shuffle Questions',
      renderingHints: {class: 'sb-g-col-lg-1'},
      required: false,
      visible: true
  },
  {
      code: 'showQuestions',
      dataType: 'text',
      description: 'Show Questions',
      editable: true,
      index: 5,
      inputType: 'select',
      label: 'Show Questions',
      name: 'showQuestions',
      placeholder: 'Show Questions',
      renderingHints: {class: 'sb-g-col-lg-1'},
      required: false,
      visible: true,
      range: [1, 2, 3]
  },
  {
      code: 'author',
      dataType: 'text',
      description: 'Author of the content',
      editable: true,
      inputType: 'text',
      label: 'Author',
      name: 'Author',
      placeholder: 'Author',
      renderingHints: {class: 'sb-g-col-lg-1'},
      required: false,
      visible: true,
  },
  {
      code: 'attributions',
      dataType: 'text',
      description: 'Attributions',
      editable: true,
      inputType: 'text',
      label: 'Attributions',
      name: 'Attributions',
      placeholder: 'Attributions',
      renderingHints: {class: 'sb-g-col-lg-1'},
      required: false,
      visible: true,
  },
  {
      code: 'copyright',
      dataType: 'text',
      description: 'Copyright & year',
      editable: true,
      inputType: 'text',
      label: 'Copyright & year',
      name: 'Copyright & year',
      placeholder: 'Copyright & year',
      renderingHints: {class: 'sb-g-col-lg-1'},
      required: false,
      visible: true,
  },
  {
      code: 'license',
      dataType: 'text',
      description: 'license',
      editable: true,
      inputType: 'select',
      label: 'license',
      name: 'license',
      placeholder: 'Select license',
      renderingHints: {class: 'sb-g-col-lg-1'},
      required: false,
      visible: true,
      range: ''
  }
];
