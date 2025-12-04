import { useEffect, useMemo, useState } from 'react';

export default function CustomizationPanel({ garment, setGarment, size, setSize, fit, setFit, colors, setColors, fabric, setFabric, patterns, pattern, setPattern, fabrics, designImage, setDesignImage, notes, setNotes, buttons, setButtons, pantsType, setPantsType, onReview }) {
  const [selectedButtonModel, setSelectedButtonModel] = useState('/orange button 3d model.glb');

  const availableButtonModels = [
    { name: 'Orange Button', path: '/orange button 3d model.glb' },
    { name: 'Four Hole Button', path: '/four hole button 3d model (1).glb' },
  ];

  const addButton = () => {
    const newButton = {
      id: Date.now(),
      modelPath: selectedButtonModel,
      position: [0, 1.2, 0.5],
      color: colors.button,
      scale: 0.15,
    };
    setButtons([...buttons, newButton]);
  };

  const deleteButton = (id) => {
    setButtons(buttons.filter(btn => btn.id !== id));
  };

  const updateButtonColor = (id, color) => {
    setButtons(buttons.map(btn => btn.id === id ? { ...btn, color } : btn));
  };

  const updateButtonScale = (id, scale) => {
    setButtons(buttons.map(btn => btn.id === id ? { ...btn, scale } : btn));
  };

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
      {(garment.startsWith('coat-')) && (
        <>
          <h3>Coat Type</h3>
          <div className="row">
            <label>Select Type
              <select value={garment} onChange={e => setGarment(e.target.value)}>
                <option value="coat-men">Blazer (Men)</option>
                <option value="coat-men-plain">Blazer Coat (Men) Plain</option>
                <option value="coat-women">Blazer (Women)</option>
                <option value="coat-women-plain">Blazer Coat (Women) Plain</option>
                <option value="coat-teal">Teal Long Coat</option>
              </select>
            </label>
          </div>
          <div className="row">
            <label>Size
              <select value={size} onChange={e => setSize(e.target.value)}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </label>
          </div>
          <div className="row">
            <label>Fit
              <select value={fit} onChange={e => setFit(e.target.value)}>
                <option value="regular">Regular</option>
                <option value="loose">Loose</option>
                <option value="fitted">Fitted</option>
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
          <div className="row">
            <label>Fit
              <select value={fit} onChange={e => setFit(e.target.value)}>
                <option value="regular">Regular</option>
                <option value="loose">Loose</option>
                <option value="fitted">Fitted</option>
              </select>
            </label>
          </div>
        </>
      )}

      {garment === 'barong' && (
        <>
          <h3>Barong Settings</h3>
          <div className="row">
            <label>Fit
              <select value={fit} onChange={e => setFit(e.target.value)}>
                <option value="regular">Regular</option>
                <option value="loose">Loose</option>
                <option value="fitted">Fitted</option>
              </select>
            </label>
          </div>
        </>
      )}

      {garment === 'pants' && (
        <>
          <h3>Pants Type</h3>
          <div className="row">
            <label>Select Type
              <select value={pantsType} onChange={e => setPantsType(e.target.value)}>
                <option value="casual-men">Pants (Men Casual)</option>
                <option value="formal-men">Pants (Men Formal)</option>
                <option value="formal-women">Pants (Women Formal)</option>
              </select>
            </label>
          </div>
          <div className="row">
            <label>Fit
              <select value={fit} onChange={e => setFit(e.target.value)}>
                <option value="regular">Regular</option>
                <option value="loose">Loose</option>
                <option value="fitted">Fitted</option>
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

      <h3>3D Buttons</h3>
      <div className="row">
        <label>Button Model
          <select value={selectedButtonModel} onChange={e => setSelectedButtonModel(e.target.value)}>
            {availableButtonModels.map(model => (
              <option key={model.path} value={model.path}>{model.name}</option>
            ))}
          </select>
        </label>
        <button onClick={addButton} style={{ marginLeft: 8 }}>Add Button</button>
      </div>

      {buttons && buttons.length > 0 && (
        <div className="row" style={{ marginTop: 8 }}>
          <label style={{ width: '100%' }}>Current Buttons ({buttons.length})</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 4, width: '100%' }}>
            {buttons.map((btn, index) => (
              <div key={btn.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ flex: 1 }}>Button {index + 1}</span>
                  <input
                    type="color"
                    value={btn.color}
                    onChange={(e) => updateButtonColor(btn.id, e.target.value)}
                    style={{ width: '40px', height: '30px' }}
                  />
                  <button onClick={() => deleteButton(btn.id)} style={{ padding: '4px 8px', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <label style={{ fontSize: '12px', minWidth: '40px' }}>Size:</label>
                  <input
                    type="range"
                    min="0.05"
                    max="0.3"
                    step="0.01"
                    value={btn.scale || 0.15}
                    onChange={(e) => updateButtonScale(btn.id, parseFloat(e.target.value))}
                    style={{ flex: 1 }}
                  />
                  <span style={{ fontSize: '12px', minWidth: '35px' }}>{((btn.scale || 0.15) * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
