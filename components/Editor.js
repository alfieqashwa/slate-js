import { useCallback, useMemo, useState } from 'react'
import { createEditor, Editor, Transforms, Text } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'

const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    })

    return !!match
  },
  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === 'code',
    })

    return !!match
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    )
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: (n) => Editor.isBlock(editor, n) }
    )
  },
}

export const EditorSlate = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ])

  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />
  }, [])

  return (
    <Slate editor={editor} value={value} onChange={(v) => setValue(v)}>
      <div>
        <button
          onMouseDown={(e) => {
            e.preventDefault()
            CustomEditor.toggleBoldMark(editor)
          }}
        >
          Bold
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault()
            CustomEditor.toggleCodeBlock(editor)
          }}
        >
          Code Block
        </button>
      </div>
      <Editable
        editor={editor}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
            return
          }

          switch (event.key) {
            case '`': {
              event.preventDefault()
              CustomEditor.toggleCodeBlock(editor)
              break
            }
            case 'b': {
              event.preventDefault()
              CustomEditor.toggleBoldMark(editor)
              break
            }
          }
          console.log(event.key)
        }}
      />
    </Slate>
  )
}

const CodeElement = (props) => (
  <pre {...props.attributes}>
    <code>{props.children}</code>
  </pre>
)

const DefaultElement = (props) => <p {...props.attributes}>{props.children}</p>

const Leaf = (props) => (
  <span
    {...props.attributes}
    style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
  >
    {props.children}
  </span>
)
