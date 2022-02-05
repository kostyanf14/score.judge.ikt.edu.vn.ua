const Header = ({ rows }) => <>
  {rows.map((row, i) => (
    <tr key={i}>
      {row.map(({ key, text, className, colSpan, rowSpan }) => (
        <th key={key} className={className} colSpan={colSpan} rowSpan={rowSpan}>{text}</th>
      ))}
    </tr>
  ))}
</>;

export default Header;
