module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      tsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'eslint:recommended'
  ],
  rules: {
    /**
     * 优先使用数组和对象解构
     * @fixable
     */
    'prefer-destructuring': ['error', {
      array: true,
      object: true
    }, {
      enforceForRenamedProperties: false
    }],

    /**
     * 对象字面量属性名称使用引号
     * @fixable
     */
    'quote-props': ['error', 'as-needed'],

    /**
     * 禁止with/in语句
     * @fixable
     */
    'no-restricted-syntax': ['error', 'WithStatement', 'BinaryExpression[operator="in"]'],

    /**
     * 禁止 if 语句作为唯一语句出现在 else 语句块中
     * @fixable
     */
    'no-lonely-if': 'error',

    /**
     * 要求方法链中每个调用都有一个换行符
     * @fixable
     */
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],

    /**
     * 路径别名设置
     * @fixable
     */
    'no-submodule-imports': ['off', '/@'],

    /**
     *
     * @fixable
     */
    'no-implicit-dependencies': ['off', ['/@']],

    /**
     * 不禁用ts comment
     * @fixable
     */
    '@typescript-eslint/ban-ts-comment': 'off',

    /**
     * 类型可以使用any
     * @fixable
     */
    '@typescript-eslint/no-explicit-any': 'off',

    /**
    * Vue中HTML元素闭合是否放到新的一行
    * @fixable
    */
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'never'
    }],

    /**
    * 禁止函数表达式中出现多余的括号
    * @category Possible Errors
    * @fixable
    */
    'no-extra-parens': ['error', 'functions'],

    /**
    * 禁止在普通字符串中出现模版字符串里的变量形式，如 'Hello ${name}!'
    * @category Possible Errors
    */
    'no-template-curly-in-string': 'error',

    /**
    * setter 必须有对应的 getter，getter 可以没有对应的 setter
    * @category Best Practices
    */
    'accessor-pairs': [
      'error',
      {
        setWithoutGet: true,
        getWithoutSet: false
      }
    ],


    /**
    * 将 var 定义的变量视为块作用域，禁止在块外使用
    * @category Best Practices
    */
    'block-scoped-var': 'error',


    /**
    * 在类的非静态方法中，必须存在对 this 的引用
    * @category Best Practices
    * @reason 太严格了
    */
    'class-methods-use-this': 'error',


    /**
    * 禁止函数的循环复杂度超过 20，https://en.wikipedia.org/wiki/Cyclomatic_complexity
    * @category Best Practices
    */
    complexity: [
      'error',
      {
        max: 20
      }
    ],


    /**
    * if 后面必须要有 {，除非是单行 if
    * @category Best Practices
    * @fixable
    */
    curly: ['error', 'multi-line', 'consistent'],


    /**
    * 链式调用的时候，点号必须放在第二行开头处，禁止放在第一行结尾处
    * @category Best Practices
    * @fixable
    */
    'dot-location': ['error', 'property'],


    /**
    * 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
    * @category Best Practices
    * @fixable
    */
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore'
      }
    ],


    /**
    * for in 内部必须有 hasOwnProperty
    * @category Best Practices
    */
    'guard-for-in': 'error',


    /**
    * 禁止使用 caller 或 callee
    * @category Best Practices
    */
    'no-caller': 'error',


    /**
    * 不允许有空函数，除非是将一个空函数设置为某个项的默认值
    * @category Best Practices
    */
    'no-empty-function': [
      'error',
      {
        allow: ['functions', 'arrowFunctions']
      }
    ],


    /**
    * 禁止使用 eval
    * @category Best Practices
    */
    'no-eval': 'error',


    /**
    * 禁止修改原生对象
    * @category Best Practices
    */
    'no-extend-native': 'error',


    /**
    * 禁止出现没必要的 bind
    * @category Best Practices
    * @fixable
    */
    'no-extra-bind': 'error',


    /**
    * 禁止出现没必要的 label
    * @category Best Practices
    * @fixable
    */
    'no-extra-label': 'error',


    /**
    * 表示小数时，禁止省略 0，比如 .5
    * @category Best Practices
    * @fixable
    */
    'no-floating-decimal': 'error',


    /**
    * 禁止使用 !! ~ 等难以理解的运算符，仅允许使用 !!
    * @category Best Practices
    * @fixable
    */
    'no-implicit-coercion': [
      'error',
      {
        allow: ['!!']
      }
    ],


    /**
    * 禁止在全局作用域下定义变量或申明函数
    * @category Best Practices
    */
    'no-implicit-globals': 'error',


    /**
    * 禁止在 setTimeout 或 setInterval 中传入字符串，如 setTimeout('alert("Hi!")', 100);
    * @category Best Practices
    */
    'no-implied-eval': 'error',


    /**
    * 禁止使用 __iterator__
    * @category Best Practices
    */
    'no-iterator': 'error',


    /**
    * 禁止使用 label
    * @category Best Practices
    */
    'no-labels': 'error',


    /**
    * 禁止使用没必要的 {} 作为代码块
    * @category Best Practices
    */
    'no-lone-blocks': 'error',


    /**
    * 禁止在循环内的函数中出现循环体条件语句中定义的变量
    * @category Best Practices
    */
    'no-loop-func': 'error',


    /**
    * 禁止出现连续的多个空格，除非是注释前，或对齐对象的属性、变量定义、import 等
    * @category Best Practices
    * @fixable
    */
    'no-multi-spaces': [
      'error',
      {
        ignoreEOLComments: true,
        exceptions: {
          Property: true,
          BinaryExpression: false,
          VariableDeclarator: true,
          ImportDeclaration: true
        }
      }
    ],


    /**
    * 禁止使用 \ 来换行字符串，应使用\n
    * @category Best Practices
    */
    'no-multi-str': 'error',


    /**
    * 禁止使用 new Function，比如 let x = new Function("a", "b", "return a + b");
    * @category Best Practices
    */
    'no-new-func': 'error',


    /**
    * 禁止使用 new 来生成 String, Number 或 Boolean
    * @category Best Practices
    */
    'no-new-wrappers': 'error',


    /**
    * 禁止使用八进制的转义符
    * @category Best Practices
    */
    'no-octal-escape': 'error',


    /**
    * 禁止使用 __proto__
    * @category Best Practices
    */
    'no-proto': 'error',


    /**
    * 禁止在 return 语句里使用 await
    * @category Best Practices
    */
    'no-return-await': 'error',

    /**
    * 禁止使用 console
    * @category Possible Errors
    * @reason console 的使用很常见
    */
    'no-console': 'off',


    /**
    * 禁止出现 location.href = 'javascript:void(0)';
    * @category Best Practices
    */
    'no-script-url': 'error',


    /**
    * 禁止将自己与自己比较
    * @category Best Practices
    */
    'no-self-compare': 'error',


    /**
    * 禁止使用逗号操作符
    * @category Best Practices
    */
    'no-sequences': 'error',


    /**
    * 禁止 throw 字面量，必须 throw 一个 Error 对象
    * @category Best Practices
    */
    'no-throw-literal': 'error',


    /**
    * 循环内必须对循环条件的变量有修改
    * @category Best Practices
    */
    'no-unmodified-loop-condition': 'error',


    /**
    * 禁止无用的表达式
    * @category Best Practices
    */
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true
      }
    ],


    /**
    * 禁止出现没必要的 call 或 apply
    * @category Best Practices
    */
    'no-useless-call': 'error',


    /**
    * 禁止出现没必要的字符串连接
    * @category Best Practices
    */
    'no-useless-concat': 'error',


    /**
    * 禁止使用 void
    * @category Best Practices
    */
    'no-void': 'error',


    /**
    * Promise 的 reject 中必须传入 Error 对象，而不是字面量
    * @category Best Practices
    */
    'prefer-promise-reject-errors': 'error',


    /**
    * parseInt 必须传入第二个参数
    * @category Best Practices
    */
    radix: 'error',


    /**
    * 立即执行的函数必须符合如下格式 (function () { alert('Hello') })()
    * @category Best Practices
    * @fixable
    */
    'wrap-iife': [
      'error',
      'inside',
      {
        functionPrototypeMethods: true
      }
    ],


    /**
    * 必须使用 if (foo === 5) 而不是 if (5 === foo)
    * @category Best Practices
    * @fixable
    */
    yoda: [
      'error',
      'never',
      {
        onlyEquality: true
      }
    ],


    /**
    * 禁止使用 'strict';
    * @category Strict Mode
    * @fixable
    */
    strict: ['error', 'never'],


    /**
    * 禁止 label 名称与定义过的变量重复
    * @category Variables
    */
    'no-label-var': 'error',


    /**
    * 禁止将 undefined 赋值给变量
    * @category Variables
    * @fixable
    */
    'no-undef-init': 'error',


    /**
    * 变量必须先定义后使用
    * @category Variables
    */
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
        variables: false
      }
    ],


    /**
    * callback 中的 error 必须被处理
    * @category Node.js and CommonJS
    */
    'handle-callback-err': 'error',


    /**
    * 禁止直接使用 Buffer
    * @category Node.js and CommonJS
    */
    'no-buffer-constructor': 'error',


    /**
    * 禁止直接 new require('foo')
    * @category Node.js and CommonJS
    */
    'no-new-require': 'error',


    /**
    * 禁止对 __dirname 或 __filename 使用字符串连接
    * @category Node.js and CommonJS
    */
    'no-path-concat': 'error',


    /**
    * 数组的括号内的前后禁止有空格
    * @category Stylistic Issues
    * @fixable
    */
    'array-bracket-spacing': ['error', 'never'],


    /**
    * 代码块如果在一行内，那么大括号内的首尾必须有空格
    * @category Stylistic Issues
    * @fixable
    */
    'block-spacing': ['error', 'always'],


    /**
    * if 与 else 的大括号风格必须一致
    * @category Stylistic Issues
    * @reason else 代码块可能前面需要有一行注释
    * @fixable
    */
    'brace-style': [
      'error',
      '1tbs', {
        allowSingleLine: true
      }],


    /**
    * 变量名必须是 camelcase 风格的
    * @category Stylistic Issues
    * @reason 很多 api 或文件名都不是 camelcase
    */
    camelcase: [
      'off', {
        properties: 'always'
      }],


    /**
    * 逗号前禁止有空格，逗号后必须要有空格
    * @category Stylistic Issues
    * @fixable
    */
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],

    /**
    * 对象的最后一个属性末尾必须有逗号
    * @category Stylistic Issues
    * @fixable
    */
    'comma-dangle': ['error', 'never'],


    /**
    * 禁止在行首写逗号
    * @category Stylistic Issues
    * @fixable
    */
    'comma-style': ['error', 'last'],


    /**
    * 用作对象的计算属性时，中括号内的首尾禁止有空格
    * @category Stylistic Issues
    * @fixable
    */
    'computed-property-spacing': ['error', 'never'],


    /**
    * 文件最后一行必须有一个空行
    * @category Stylistic Issues
    * @reason 没必要限制
    * @fixable
    */
    'eol-last': 'error',


    /**
    * 函数名和执行它的括号之间禁止有空格
    * @category Stylistic Issues
    * @fixable
    */
    'func-call-spacing': ['error', 'never'],


    /**
    * 函数赋值给变量的时候，函数名必须与变量名一致
    * @category Stylistic Issues
    */
    'func-name-matching': [
      'error',
      'always',
      {
        includeCommonJSModuleExports: false
      }
    ],


    /**
    * 函数参数要么同在一行要么每行一个
    * @category Stylistic Issues
    * @fixable
    */
    'function-paren-newline': ['error', 'multiline'],


    /**
    * 箭头函数的函数体必须与箭头在同一行，或者被括号包裹
    * @category Stylistic Issues
    * @autofix
    */
    'implicit-arrow-linebreak': ['error', 'beside'],


    /**
    * 一个缩进必须用四个空格替代
    * @category Stylistic Issues
    * @fixable
    */
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true
      }
    ],


    /**
    * jsx 中的属性必须用双引号
    * @category Stylistic Issues
    * @fixable
    */
    'jsx-quotes': ['error', 'prefer-double'],


    /**
    * 对象字面量中冒号前面禁止有空格，后面必须有空格
    * @category Stylistic Issues
    * @fixable
    */
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'strict'
      }
    ],


    /**
    * 关键字前后必须有空格
    * @category Stylistic Issues
    * @fixable
    */
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],


    /**
    * 代码块嵌套的深度禁止超过 5 层
    * @category Stylistic Issues
    */
    'max-depth': ['error', 7],


    /**
    * 回调函数嵌套禁止超过 3 层，多了请用 async await 替代
    * @category Stylistic Issues
    */
    'max-nested-callbacks': ['error', 5],


    /**
    * 函数的参数禁止超过 10 个
    * @category Stylistic Issues
    */
    'max-params': ['error', 10],


    /**
    * new 后面的类名必须首字母大写
    * @category Stylistic Issues
    */
    'new-cap': [
      'error',
      {
        newIsCap: true,
        capIsNew: false,
        properties: true
      }
    ],


    /**
    * new 后面的类必须有小括号
    * @category Stylistic Issues
    * @fixable
    */
    'new-parens': 'error',


    /**
    * 禁止使用 Array 构造函数
    * @category Stylistic Issues
    */
    'no-array-constructor': 'error',


    /**
    * 禁止出现超过三行的连续空行
    * @category Stylistic Issues
    * @fixable
    */
    'no-multiple-empty-lines': [
      'error',
      {
        max: 3,
        maxEOF: 1,
        maxBOF: 1
      }
    ],


    /**
    * 禁止使用 tabs
    * @category Stylistic Issues
    */
    'no-tabs': 'error',


    /**
    * 禁止行尾有空格
    * @category Stylistic Issues
    * @fixable
    */
    'no-trailing-spaces': 'error',


    /**
    * 必须使用 !a 替代 a ? false : true
    * @category Stylistic Issues
    * @reason 后者表达的更清晰
    * @fixable
    */
    'no-unneeded-ternary': 'error',


    /**
    * 禁止属性前有空格，比如 foo. bar()
    * @category Stylistic Issues
    * @fixable
    */
    'no-whitespace-before-property': 'error',


    /**
    * 禁止 if 后面不加大括号而写两行代码
    * @category Stylistic Issues
    * @fixable
    */
    'nonblock-statement-body-position': [
      'error',
      'beside',
      {
        overrides: {
          while: 'below'
        }
      }
    ],


    /**
    * 大括号内的首尾必须有换行
    * @category Stylistic Issues
    * @fixable
    */
    'object-curly-newline': [
      'error',
      {
        multiline: true,
        consistent: true
      }
    ],


    /**
    * 对象字面量只有一行时，大括号内的首尾必须有空格
    * @category Stylistic Issues
    * @fixable
    */
    'object-curly-spacing': [
      'error',
      'always',
      {
        arraysInObjects: true,
        objectsInObjects: false
      }
    ],


    /**
    * 禁止变量申明时用逗号一次申明多个
    * @category Stylistic Issues
    */
    'one-var': ['error', 'never'],


    /**
    * 变量申明必须每行一个
    * @category Stylistic Issues
    * @fixable
    */
    'one-var-declaration-per-line': ['error', 'always'],


    /**
    * 使用 ... 而不是 Object.assign
    * @category Stylistic Issues
    * @fixable
    */
    'prefer-object-spread': 'error',


    /**
    * 必须使用单引号，禁止使用双引号
    * @category Stylistic Issues
    * @fixable
    */
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],


    /**
    * 结尾必须没有分号
    * @category Stylistic Issues
    * @fixable
    */
    semi: ['error', 'never'],


    /**
    * 一行有多个语句时，分号前面禁止有空格，分号后面必须有空格
    * @category Stylistic Issues
    * @fixable
    */
    'semi-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],


    /**
    * 分号必须写在行尾，禁止在行首出现
    * @category Stylistic Issues
    * @fixable
    */
    'semi-style': ['error', 'last'],


    /**
    * if, function 等的大括号之前必须要有空格，比如 if (a) {
    * @category Stylistic Issues
    * @fixable
    */
    'space-before-blocks': ['error', 'always'],


    /**
    * 命名函数表达式括号前禁止有空格，箭头函数表达式括号前面必须有一个空格
    * @category Stylistic Issues
    * @fixable
    */
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'ignore',
        named: 'never',
        asyncArrow: 'always'
      }
    ],


    /**
    * 小括号内的首尾禁止有空格
    * @category Stylistic Issues
    * @fixable
    */
    'space-in-parens': ['error', 'never'],


    /**
    * 操作符左右必须有空格
    * @category Stylistic Issues
    * @fixable
    */
    'space-infix-ops': 'error',


    /**
    * new, typeof 等后面必须有空格，++, -- 等禁止有空格
    * @category Stylistic Issues
    * @fixable
    */
    'space-unary-ops': [
      'error',
      {
        words: true,
        nonwords: false
      }
    ],


    /**
    * 注释的斜线或 * 后必须有空格
    * @category Stylistic Issues
    * @fixable
    */
    'spaced-comment': [
      'error',
      'always',
      {
        block: {
          exceptions: ['*'],
          balanced: true
        }
      }
    ],


    /**
    * case 的冒号前禁止有空格，冒号后必须有空格
    * @category Stylistic Issues
    * @fixable
    */
    'switch-colon-spacing': [
      'error',
      {
        after: false,
        before: false
      }
    ],


    /**
    * 模版字符串的 tag 之后禁止有空格，比如 tag`Hello World`
    * @category Stylistic Issues
    * @fixable
    */
    'template-tag-spacing': ['error', 'never'],


    /**
    * 文件开头禁止有 BOM
    * @category Stylistic Issues
    * @fixable
    */
    'unicode-bom': ['error', 'never'],


    /**
    * 箭头函数的箭头前后必须有空格
    * @category ECMAScript 6
    * @fixable
    */
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],


    /**
    * generator 的 * 前面禁止有空格，后面必须有空格
    * @category ECMAScript 6
    * @fixable
    */
    'generator-star-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],


    /**
    * 禁止出现难以理解的箭头函数，比如 let x = a => 1 ? 2 : 3
    * @category ECMAScript 6
    * @fixable
    */
    'no-confusing-arrow': [
      'error',
      {
        allowParens: true
      }
    ],


    /**
    * 禁止重复 import 模块
    * @category ECMAScript 6
    */
    'no-duplicate-imports': 'error',


    /**
    * 禁止出现没必要的计算键名，比如 let a = { ['0']: 0 };
    * @category ECMAScript 6
    * @fixable
    */
    'no-useless-computed-key': 'error',


    /**
    * 禁止出现没必要的 constructor，比如 constructor(value) { super(value) }
    * @category ECMAScript 6
    */
    'no-useless-constructor': 'error',


    /**
    * 禁止解构时出现同样名字的的重命名，比如 let { foo: foo } = bar;
    * @category ECMAScript 6
    * @fixable
    */
    'no-useless-rename': 'error',


    /**
    * 禁止使用 var
    * @category ECMAScript 6
    * @fixable
    */
    'no-var': 'error',


    /**
    * ... 的后面禁止有空格
    * @category ECMAScript 6
    * @fixable
    */
    'rest-spread-spacing': ['error', 'never'],


    /**
    * 创建 Symbol 时必须传入参数
    * @category ECMAScript 6
    */
    'symbol-description': 'error',


    /**
    * ${name} 内的首尾禁止有空格
    * @category ECMAScript 6
    * @fixable
    */
    'template-curly-spacing': ['error', 'never'],


    /**
    * yield* 后面必须要有空格
    * @category ECMAScript 6
    * @fixable
    */
    'yield-star-spacing': ['error', 'after']
  }
}
