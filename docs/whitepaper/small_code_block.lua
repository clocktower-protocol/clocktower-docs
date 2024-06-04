function CodeBlock(elem)
  -- Apply smaller font size in HTML
  if FORMAT:match 'html' then
    return pandoc.RawBlock('html', '<pre style="font-size: 0.6em;"><code>' .. elem.text .. '</code></pre>')
  -- Apply smaller font size in LaTeX
  elseif FORMAT:match 'latex' then
    return pandoc.RawBlock('latex', '\\scriptsize\n\\begin{verbatim}\n' .. elem.text .. '\n\\end{verbatim}\n\\normalsize')
  else
    return elem
  end
end
