import type { IToolbarConfig } from "@wangeditor/editor"

export const toolbarConfig: Partial<IToolbarConfig> = {
  toolbarKeys: [
    "bold",
    "underline",
    "italic",
    "through",
    "clearStyle",
    "color",
    "bgColor",
    "fontSize",
    "fontFamily",
    "indent",
    "delIndent",
    "justifyLeft",
    "justifyRight",
    "justifyCenter",
    "justifyJustify",
    "lineHeight",
    "divider",
    "insertLink",
    "editLink",
    "unLink",
    "viewLink",
    "headerSelect",
    "header1",
    "header2",
    "header3",
    "header4",
    "header5",
    "fullScreen"
  ]
}

export const editorConfig = {
  placeholder: "请输入内容",
}
