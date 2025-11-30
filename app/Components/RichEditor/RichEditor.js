"use client"
import React, { useState, useRef, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Link2, 
  Image, 
  Type,
  Undo,
  Redo,
  IndentDecrease,
  IndentIncrease
} from 'lucide-react';

const RichTextEditor = () => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const editorRef = useRef(null);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleInsertLink = () => {
    if (linkUrl.trim()) {
      execCommand('createLink', linkUrl);
      setLinkUrl('');
      setShowLinkModal(false);
    }
  };

  const handleInsertImage = () => {
    if (imageUrl.trim()) {
      execCommand('insertImage', imageUrl);
      setImageUrl('');
      setShowImageModal(false);
    }
  };

  const ToolbarButton = ({ icon: Icon, command, value, title, onClick }) => (
    <button
      type="button"
      onClick={onClick || (() => execCommand(command, value))}
      className="p-2 hover:bg-slate-700 rounded transition-colors"
      title={title}
    >
      <Icon size={18} className="text-slate-300" />
    </button>
  );

  return (
    <div className="h-48 bg-background2 my-4 ">
      <div className="w-full ">
  
        {/* Link Modal */}
        {showLinkModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-slate-800 p-6 rounded-lg shadow-xl w-96">
              <h3 className="text-slate-200 text-lg font-semibold mb-4">Insert Link</h3>
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="Enter URL"
                className="w-full bg-slate-700 text-slate-200 px-4 py-2 rounded border border-slate-600 focus:outline-none focus:border-slate-500 mb-4"
                onKeyDown={(e) => e.key === 'Enter' && handleInsertLink()}
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => {
                    setShowLinkModal(false);
                    setLinkUrl('');
                  }}
                  className="px-4 py-2 bg-slate-700 text-slate-300 rounded hover:bg-slate-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInsertLink}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Insert
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {showImageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-slate-800 p-6 rounded-lg shadow-xl w-96">
              <h3 className="text-slate-200 text-lg font-semibold mb-4">Insert Image</h3>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="w-full bg-slate-700 text-slate-200 px-4 py-2 rounded border border-slate-600 focus:outline-none focus:border-slate-500 mb-4"
                onKeyDown={(e) => e.key === 'Enter' && handleInsertImage()}
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => {
                    setShowImageModal(false);
                    setImageUrl('');
                  }}
                  className="px-4 py-2 bg-slate-700 text-slate-300 rounded hover:bg-slate-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInsertImage}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Insert
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div className="bg-background2 p-3">
          <div className="flex items-center gap-1 flex-wrap">
            <ToolbarButton icon={Bold} command="bold" title="Bold" />
            <ToolbarButton icon={Italic} command="italic" title="Italic" />
            
            <div className="w-px h-6 bg-background2 mx-1" />
            
            <ToolbarButton icon={List} command="insertUnorderedList" title="Bullet List" />
            <ToolbarButton icon={ListOrdered} command="insertOrderedList" title="Numbered List" />
            
            <div className="w-px h-6 bg-slate-600 mx-1" />
            
            <ToolbarButton icon={Quote} command="formatBlock" value="blockquote" title="Quote" />
            
            <div className="w-px h-6 bg-slate-600 mx-1" />
            
            <ToolbarButton icon={AlignLeft} command="justifyLeft" title="Align Left" />
            <ToolbarButton icon={AlignCenter} command="justifyCenter" title="Align Center" />
            <ToolbarButton icon={AlignRight} command="justifyRight" title="Align Right" />
            
            <div className="w-px h-6 bg-background2 border-t  mx-1" />
            
            <ToolbarButton 
              icon={Link2} 
              title="Insert Link"
              onClick={() => setShowLinkModal(true)}
            />
            <ToolbarButton 
              icon={Image} 
              title="Insert Image"
              onClick={() => setShowImageModal(true)}
            />
            
            <div className="w-px h-6 bg-background2 mx-1" />
            
            <ToolbarButton icon={Type} command="formatBlock" value="h2" title="Heading" />
            <ToolbarButton icon={IndentIncrease} command="indent" title="Increase Indent" />
            <ToolbarButton icon={IndentDecrease} command="outdent" title="Decrease Indent" />
            
            <div className="w-px h-6 bg-slate-600 mx-1" />
            
            <ToolbarButton icon={Undo} command="undo" title="Undo" />
            <ToolbarButton icon={Redo} command="redo" title="Redo" />
          </div>
        </div>

        {/* Editor Area */}
        <div className="bg-background2 border-t  p-6 min-h-[300px]">
          <div
            ref={editorRef}
            contentEditable
            className="text-slate-300 outline-none min-h-[250px] leading-relaxed"
            onInput={(e) => setContent(e.currentTarget.innerHTML)}
            suppressContentEditableWarning
            style={{ caretColor: '#94a3b8' }}
          >
            {!content && (
              <span className="text-body pointer-events-none">
                Start writing your blog content here...
              </span>
            )}
          </div>
        </div>

      
      </div>

      <style jsx>{`
      [contenteditable] {
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: normal;
        width:700px
      }
      
      [contenteditable] h2 {
        font-size: 1.5em;
        font-weight: bold;
        margin: 0.5em 0;
      }
      
      [contenteditable] blockquote {
        border-left: 4px solid #475569;
        padding-left: 1em;
        margin: 1em 0;
        color: #94a3b8;
      }
      
      [contenteditable] ul,
      [contenteditable] ol {
        margin: 0.5em 0;
        padding-left: 2em;
      }
      
      [contenteditable] a {
        color: #60a5fa;
        text-decoration: underline;
      }
      
      [contenteditable] img {
        max-width: 100%;
        height: auto;
        margin: 1em 0;
      }
      
      `}</style>
    </div>
  );
};

export default RichTextEditor;