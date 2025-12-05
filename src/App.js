import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Viewer3D from './components/Viewer3D';

import CustomizationPanel from './components/CustomizationPanel';

const defaultMeasurements = {
  chest: 38,
  waist: 32,
  hips: 38,
  shoulders: 18,
  sleeveLength: 25,
  inseam: 30,
};

const defaultPersonalization = {
  initials: '',
  font: 'Serif',
  size: 0.8,
};

const defaultColors = {
  fabric: '#3a5a72',
  lining: '#1e2a35',
  button: '#c8a66a',
  stitching: '#e1d6c7',
};

const fabrics = ['silk', 'linen', 'cotton', 'wool'];
const patterns = ['none', 'minimal-stripe', 'minimal-check', 'embroidery-1', 'embroidery-2'];

const coatStyle = { lapel: 'notch', buttons: 2, pocket: 'flap', vents: 'single' };
const barongStyle = { collar: 'classic', sleeves: 'long', transparency: 0.35, embroidery: 'preset-a' };
const suitStyle = { lapel: 'peak', buttons: 2, pocket: 'jetted', vents: 'double' };
const pantsStyle = { fit: 'regular', pleats: 'none', cuffs: 'none' };

export default function App() {
  const [garment, setGarment] = useState('coat-men');
  const [size, setSize] = useState('medium'); // Added size state for blazers
  const [fit, setFit] = useState('regular'); // Added fit state for all garments
  const [modelSize, setModelSize] = useState('full'); // Added model size state (full or short)
  const [colors, setColors] = useState(defaultColors);
  const [fabric, setFabric] = useState('wool');
  const [pattern, setPattern] = useState('none');
  const [style, setStyle] = useState(coatStyle);
  const [measurements, setMeasurements] = useState(defaultMeasurements);
  const [personalization, setPersonalization] = useState(defaultPersonalization);
  const [designImage, setDesignImage] = useState(null);
  const [notes, setNotes] = useState('');

  const [buttons, setButtons] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [pantsType, setPantsType] = useState('casual-men');
  const [mobileView, setMobileView] = useState('viewer'); // 'viewer' or 'controls'

  useEffect(() => {
    const saved = localStorage.getItem('tailorDesign');
    if (saved) {
      const v = JSON.parse(saved);
      if (v) {
        setGarment(v.garment || 'coat');
        setSize(v.size || 'medium');
        setFit(v.fit || 'regular');
        setModelSize(v.modelSize || 'full');
        setColors(v.colors || defaultColors);
        setFabric(v.fabric || 'wool');
        setPattern(v.pattern || 'none');
        setStyle(v.style || coatStyle);
        setMeasurements(v.measurements || defaultMeasurements);
        setPersonalization(v.personalization || defaultPersonalization);
        setDesignImage(v.designImage || null);
        setNotes(v.notes || '');
        setButtons(v.buttons || []);
        setAccessories(v.accessories || []);
        setPantsType(v.pantsType || 'casual-men');
      }
    }
  }, []);

  useEffect(() => {
    const s = garment.startsWith('coat') ? coatStyle : garment === 'barong' ? barongStyle : garment.startsWith('suit') ? suitStyle : pantsStyle;
    setStyle(s);
  }, [garment]);

  const summary = useMemo(() => ({
    garment,
    size,
    fit,
    modelSize,
    colors,
    fabric,
    pattern,
    style,
    measurements,
    personalization,
    designImage,
    notes,
    buttons,
    accessories,
    pantsType,
  }), [garment, size, fit, modelSize, colors, fabric, pattern, style, measurements, personalization, buttons, accessories]);

  const onSave = () => {
    localStorage.setItem('tailorDesign', JSON.stringify(summary));
  };



  return (
    <div className="app">
      <div className="nav">
        <button className={garment.startsWith('coat') ? 'active' : ''} onClick={() => setGarment('coat-men')}>Blazer</button>
        <button className={garment === 'barong' ? 'active' : ''} onClick={() => setGarment('barong')}>Barong</button>
        <button className={garment.startsWith('suit') ? 'active' : ''} onClick={() => setGarment('suit-1')}>Suit</button>
        <button className={garment === 'pants' ? 'active' : ''} onClick={() => setGarment('pants')}>Pants</button>
        <button
          className="download-btn"
          onClick={() => document.dispatchEvent(new Event('export-png'))}
          title="Download as PNG"
        >
          📥 Download PNG
        </button>
      </div>

      <div className="panel">
        <CustomizationPanel
          garment={garment}
          setGarment={setGarment}
          size={size}
          setSize={setSize}
          fit={fit}
          setFit={setFit}
          modelSize={modelSize}
          setModelSize={setModelSize}
          colors={colors}
          setColors={setColors}
          fabric={fabric}
          setFabric={setFabric}
          patterns={patterns}
          pattern={pattern}
          setPattern={setPattern}
          fabrics={fabrics}
          designImage={designImage}
          setDesignImage={setDesignImage}
          notes={notes}
          setNotes={setNotes}
          buttons={buttons}
          setButtons={setButtons}
          accessories={accessories}
          setAccessories={setAccessories}
          pantsType={pantsType}
          setPantsType={setPantsType}

        />

      </div>
      <div className="viewer">
        <Viewer3D
          garment={garment}
          size={size}
          fit={fit}
          modelSize={modelSize}
          colors={colors}
          fabric={fabric}
          pattern={pattern}
          style={style}
          measurements={measurements}
          personalization={personalization}
          buttons={buttons}
          setButtons={setButtons}
          accessories={accessories}
          setAccessories={setAccessories}
          pantsType={pantsType}
        />
      </div>
    </div>
  );
}
