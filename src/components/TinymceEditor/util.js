const BASE_URL = process.env.BASE_URL;
/**
 * 默认配置
 */
export const DEFAULT_CONFIG = {
  height: 300,
  branding: false,
  skin_url: BASE_URL + 'tinymce/skins/ui/oxide',
  content_css: BASE_URL + 'tinymce/skins/content/default/content.min.css',
  language_url: BASE_URL + 'tinymce/langs/zh_CN.js',
  language: 'zh_CN',
  plugins: [
    'code',
    'preview',
    'fullscreen',
    'searchreplace',
    'save',
    'autosave',
    'link',
    'autolink',
    'image',
    'media',
    'table',
    'codesample',
    'lists',
    'advlist',
    'charmap',
    'emoticons',
    'anchor',
    'directionality',
    'pagebreak',
    'quickbars',
    'nonbreaking',
    'visualblocks',
    'visualchars',
    'wordcount'
  ].join(' '),
  toolbar: [
    'fullscreen',
    'preview',
    'code',
    '|',
    'undo',
    'redo',
    '|',
    'forecolor',
    'backcolor',
    '|',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    '|',
    'alignleft',
    'aligncenter',
    'alignright',
    'alignjustify',
    '|',
    'outdent',
    'indent',
    '|',
    'numlist',
    'bullist',
    '|',
    'formatselect',
    'fontselect',
    'fontsizeselect',
    '|',
    'link',
    'image',
    'media',
    'emoticons',
    'charmap',
    'anchor',
    'pagebreak',
    'codesample',
    '|',
    'ltr',
    'rtl'
  ].join(' '),
  draggable_modal: true,
  toolbar_mode: 'sliding',
  images_upload_handler: (blobInfo, success) => {
    success('data:image/jpeg;base64,' + blobInfo.base64());
  },
  file_picker_types: 'media',
  file_picker_callback: () => {}
};

/**
 * 暗黑主题配置
 */
export const DARK_CONFIG = {
  skin_url: BASE_URL + 'tinymce/skins/ui/oxide-dark',
  content_css: BASE_URL + 'tinymce/skins/content/dark/content.min.css'
};

/**
 * 切换编辑器主题
 * @param dark 是否是暗黑主题
 */
export function changeEditorTheme(dark) {
  [].forEach.call(document.head.querySelectorAll('[id^="mce-"]'), (elem) => {
    let href = elem.getAttribute('href');
    if (href.includes('/oxide-dark/')) {
      if (!dark) {
        href = href.replace('/oxide-dark/', '/oxide/');
        elem.setAttribute('href', href);
      }
    } else if (dark) {
      href = href.replace('/oxide/', '/oxide-dark/');
      elem.setAttribute('href', href);
    }
  });

  // 切换编辑器内容区的主题
  [].forEach.call(
    document.body.querySelectorAll('iframe[id^="tiny-vue_"]'),
    (frame) => {
      const win = frame.contentWindow;
      if (win) {
        const doc = win.document;
        if (doc) {
          [].forEach.call(doc.head.querySelectorAll('[id^="mce-"]'), (elem) => {
            let href = elem.getAttribute('href');
            if (href.includes('/skins/ui/')) {
              if (href.includes('/oxide-dark/')) {
                if (!dark) {
                  href = href.replace('/oxide-dark/', '/oxide/');
                  elem.setAttribute('href', href);
                }
              } else if (dark) {
                href = href.replace('/oxide/', '/oxide-dark/');
                elem.setAttribute('href', href);
              }
            } else if (href.includes('/skins/content/')) {
              if (href.includes('/dark/')) {
                if (!dark) {
                  href = href.replace('/dark/', '/default/');
                  elem.setAttribute('href', href);
                }
              } else if (dark) {
                href = href.replace('/default/', '/dark/');
                elem.setAttribute('href', href);
              }
            }
          });
        }
      }
    }
  );
}
