import { useEffect, useMemo } from 'react';

export default function CustomizationPanel({ garment, setGarment, colors, setColors, fabric, setFabric, patterns, pattern, setPattern, fabrics, designImage, setDesignImage, notes, setNotes, onReview }) {

  // Preset color options
  const presetColors = [
    { name: 'Black', value: '#2c2c2c' },
    { name: 'Navy', value: '#1e3a5f' },
    { name: 'Burgundy', value: '#6b1e3d' },
    { name: 'Forest Green', value: '#2d5a3d' },
    { name: 'Charcoal', value: '#4a4a4a' },
    { name: 'Tan', value: '#b8956a' },
    { name: 'Cream', value: '#f5e6d3' },
  ];

  return (
    <div className="group">
      {(garment === 'coat-men' || garment === 'coat-women' || garment === 'coat-teal') && (
        <>
          <h3>Coat Type</h3>
          <div className="row">
            <label>Select Type
              <select value={garment} onChange={e => setGarment(e.target.value)}>
                <option value="coat-men">Blazer (Men)</option>
                <option value="coat-women">Blazer (Women)</option>
                <option value="coat-teal">Teal Long Coat</option>
              </select>
            </label>
          </div>
        </>
      )}

      {(garment === 'suit-1' || garment === 'suit-2') && (
        <>
          <h3>Suit Type</h3>
          <div className="row">
            <label>Select Type
              <select value={garment} onChange={e => setGarment(e.target.value)}>
                <option value="suit-1">Business Suit Style 1</option>
                <option value="suit-2">Business Suit Style 2</option>
              </select>
            </label>
          </div>
        </>
      )}

      <h3>Colors</h3>
      <div className="row">
        <label>Fabric color<input className="color-input" type="color" value={colors.fabric} onChange={e => setColors({ ...colors, fabric: e.target.value })} /></label>
        <label>Button color<input className="color-input" type="color" value={colors.button} onChange={e => setColors({ ...colors, button: e.target.value })} /></label>
      </div>
      <div className="row" style={{ marginTop: 8 }}>
        <label style={{ width: '100%' }}>Preset Colors</label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: 4 }}>
          {presetColors.map((color) => (
            <button
              key={color.value}
              onClick={() => setColors({ ...colors, fabric: color.value })}
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: color.value,
                border: colors.fabric === color.value ? '3px solid #000' : '2px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
                padding: 0,
              }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <h3>Fabric & Pattern</h3>
      <div className="row">
        <label>Fabric<select value={fabric} onChange={e => setFabric(e.target.value)}>{fabrics.map(f => <option key={f} value={f}>{f}</option>)}</select></label>
        <label>Pattern<select value={pattern} onChange={e => setPattern(e.target.value)}>{patterns.map(p => <option key={p} value={p}>{p}</option>)}</select></label>
      </div>

      <h3>Additional Details</h3>
      <div className="row">
        <label>Design Image (Optional)
          <input type="file" accept="image/*" onChange={e => {
            if (e.target.files && e.target.files[0]) {
              setDesignImage(URL.createObjectURL(e.target.files[0]));
            }
          }} />
        </label>
        {designImage && <img src={designImage} alt="Design Preview" style={{ width: '100%', maxHeight: 150, objectFit: 'contain', marginTop: 8 }} />}
        <label>Notes for Admin
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4} style={{ width: '100%', marginTop: 4 }} placeholder="Enter any specific instructions..." />
        </label>
      </div>

      <div className="row" style={{ marginTop: 8 }}>
        <button onClick={onReview}>Review Order</button>
      </div>
    </div>
  );
}
