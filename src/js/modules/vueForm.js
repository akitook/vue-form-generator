import Vue from 'vue';
import VueFormGenerator from 'vue-form-generator';

const vueForm = () => {
  const formGenerator = new Vue({
    components: {
      'vue-form-generator': VueFormGenerator.component
    },
    data () {
      return {
        isShowModal: false,
        model: {},
        schema: {
          fields: [
            {
              type: 'textArea',
              inputType: '',
              label: '応募の動機',
              model: this.getUniqueStr('textArea'),
              required: true,
              hint: '今回こちらのプログラムに応募した動機をご記入ください。'
            }
          ]
        },
        schemaBase: {
          fields: [
            {
              id: 1,
              type: 'input',
              inputType: 'text',
              label: 'ID',
              model: 'id',
              readonly: true,
              featured: false,
              disabled: true
            },
            {
              id: 2,
              type: 'input',
              inputType: 'text',
              label: 'Name',
              model: 'name',
              readonly: false,
              featured: true,
              required: true,
              disabled: false,
              placeholder: "User's name",
              validator: VueFormGenerator.validators.string
            },
            {
              id: 3,
              type: 'input',
              inputType: 'password',
              label: 'Password',
              model: 'password',
              min: 6,
              required: true,
              hint: 'Minimum 6 characters',
              validator: VueFormGenerator.validators.string
            },
            {
              id: 4,
              type: 'input',
              inputType: 'number',
              label: 'Age',
              model: 'age',
              min: 18,
              validator: VueFormGenerator.validators.number
            },
            {
              id: 5,
              type: 'input',
              inputType: 'email',
              label: 'E-mail',
              model: 'email',
              placeholder: "User's e-mail address",
              validator: VueFormGenerator.validators.email
            },
            {
              id: 6,
              type: 'checklist',
              label: 'Skills',
              model: 'skills',
              multi: true,
              required: true,
              multiSelect: true,
              values: [
                'HTML5',
                'Javascript',
                'CSS3',
                'CoffeeScript',
                'AngularJS',
                'ReactJS',
                'VueJS'
              ]
            },
            {
              id: 7,
              type: 'switch',
              label: 'Status',
              model: 'status',
              multi: true,
              readonly: false,
              featured: false,
              disabled: false,
              default: true,
              textOn: 'Active',
              textOff: 'Inactive'
            }
          ]
        },
        formOptions: {
          validateAfterLoad: true,
          validateAfterChanged: true
        }
      };
    },
    methods: {
      changeType: function (fieldsIndex, event) {
        let type = event.target.value;
        let field = {
          type: 'input',
          inputType: 'text',
          label: 'テキストタイトル',
          max: 50,
          model: this.getUniqueStr(type),
          required: true
        };
        switch (type) {
        case 'input':
          this.schema.fields.splice(fieldsIndex, 1, field);
          break;
        case 'textArea':
          field = {
            type: 'textArea',
            max: 1000,
            rows: 4,
            label: 'テキストエリアタイトル',
            model: this.getUniqueStr(type),
            required: true
          };
          this.schema.fields.splice(fieldsIndex, 1, field);
          break;
        case 'checklist':
          field = {
            type: 'checklist',
            label: 'チェックリストタイトル',
            listBox: true,
            model: this.getUniqueStr(type),
            required: true,
            values: ['選択肢1']
          };
          this.schema.fields.splice(fieldsIndex, 1, field);
          break;
        case 'radios':
          field = {
            type: 'radios',
            label: 'ラジオボタンタイトル',
            model: this.getUniqueStr(type),
            required: true,
            values: ['選択肢1']
          };
          this.schema.fields.splice(fieldsIndex, 1, field);
          break;
        case 'select':
          field = {
            type: 'select',
            label: 'セレクトボタンタイトル',
            model: this.getUniqueStr(type),
            required: true,
            values: ['選択肢1'],
            selectOptions: {
              noneSelectedText: '選択してください'
            }
          };
          this.schema.fields.splice(fieldsIndex, 1, field);
          break;
        case 'upload':
          field = {
            type: 'upload',
            inputName: 'file-name',
            label: 'PDFファイルアップロードタイトル',
            accept: 'application/pdf',
            model: this.getUniqueStr(type),
            required: true,
            onChanged (model, schema, event) {
              field.inputName = event.target.files[0].name;
              this.model[field.model] = event.target.value;
            }
          };
          this.schema.fields.splice(fieldsIndex, 1, field);
          break;
        }
      },
      addBlock: function () {
        this.schema.fields.push({
          type: 'input',
          inputType: 'text',
          label: 'タイトル',
          model: this.getUniqueStr(),
          listBox: true,
          required: false,
          values: ['選択肢1']
        });
      },
      deleteBlock: function (index) {
        this.schema.fields.splice(index, 1);
      },
      swapBefore: function (index) {
        // 一個前の項目と並び替え
        this.schema.fields.splice(
          index - 1,
          2,
          this.schema.fields[index],
          this.schema.fields[index - 1]
        );
      },
      swapAfter: function (index) {
        // 一個後ろの項目と並び替え
        this.schema.fields.splice(
          index,
          2,
          this.schema.fields[index + 1],
          this.schema.fields[index]
        );
      },
      removeOption: function (fieldsIndex, valuesIndex) {
        let values = this.schema.fields[fieldsIndex].values;
        values.splice(valuesIndex, 1);
      },
      addOption: function (fieldsIndex) {
        let values = this.schema.fields[fieldsIndex].values;
        values.push(`選択肢${values.length + 1}`);
      },
      showModal: function () {
        this.isShowModal = true;
      },
      closeModal: function () {
        this.isShowModal = false;
      },
      prettyJSON: function (json) {
        if (json) {
          json = JSON.stringify(json, undefined, 4);
          json = json
            .replace(/&/g, '&')
            .replace(/</g, '<')
            .replace(/>/g, '>');
          return json.replace(
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
            function (match) {
              let cls = 'number';
              if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                  cls = 'key';
                } else {
                  cls = 'string';
                }
              } else if (/true|false/.test(match)) {
                cls = 'boolean';
              } else if (/null/.test(match)) {
                cls = 'null';
              }
              return '<span class="' + cls + '">' + match + '</span>';
            }
          );
        }
      },
      getUniqueStr (type) {
        return (
          type + '-' + new Date().getTime().toString(32) +
          Math.floor(1000 * Math.random()).toString(32)
        );
      }
    }
  });

  formGenerator.$mount('#form-generator');
};

export default vueForm();
