import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Viewer3D from './components/Viewer3D';
import ReviewPage from './components/ReviewPage';
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
  const [colors, setColors] = useState(defaultColors);
  const [fabric, setFabric] = useState('wool');
  const [pattern, setPattern] = useState('none');
  const [style, setStyle] = useState(coatStyle);
  const [measurements, setMeasurements] = useState(defaultMeasurements);
  const [personalization, setPersonalization] = useState(defaultPersonalization);
  const [designImage, setDesignImage] = useState(null);
  const [notes, setNotes] = useState('');
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('tailorDesign');
    if (saved) {
      const v = JSON.parse(saved);
      if (v) {
        setGarment(v.garment || 'coat');
        setColors(v.colors || defaultColors);
        setFabric(v.fabric || 'wool');
        setPattern(v.pattern || 'none');
        setStyle(v.style || coatStyle);
        setMeasurements(v.measurements || defaultMeasurements);
        setPersonalization(v.personalization || defaultPersonalization);
        setDesignImage(v.designImage || null);
        setNotes(v.notes || '');
      }
    }
  }, []);

  useEffect(() => {
    const s = garment.startsWith('coat') ? coatStyle : garment === 'barong' ? barongStyle : garment.startsWith('suit') ? suitStyle : pantsStyle;
    setStyle(s);
  }, [garment]);

  const summary = useMemo(() => ({
    garment,
    colors,
    fabric,
    pattern,
    style,
    measurements,
    personalization,
    designImage,
    notes,
  }), [garment, colors, fabric, pattern, style, measurements, personalization]);

  const onSave = () => {
    localStorage.setItem('tailorDesign', JSON.stringify(summary));
  };

  if (showReview) {
    return (
      <ReviewPage
        garment={garment}
        colors={colors}
        fabric={fabric}
        pattern={pattern}
        style={style}
        measurements={measurements}
        personalization={personalization}
        designImage={designImage}
        notes={notes}
        onBack={() => setShowReview(false)}
        onSubmit={() => alert('Order Submitted!')}
      />
    );
  }

  return (
    <div className="app">
      <div className="nav">
        <button className={garment.startsWith('coat') ? 'active' : ''} onClick={() => setGarment('coat-men')}>Blazer</button>
        <button className={garment === 'barong' ? 'active' : ''} onClick={() => setGarment('barong')}>Barong</button>
        <button className={garment.startsWith('suit') ? 'active' : ''} onClick={() => setGarment('suit-1')}>Suit</button>
        <button className={garment === 'pants' ? 'active' : ''} onClick={() => setGarment('pants')}>Pants</button>
      </div>
      <div className="panel">
        <CustomizationPanel
          garment={garment}
          setGarment={setGarment}
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
          onReview={() => setShowReview(true)}
        />
        <div className="summary">
          <div>Garment: {garment}</div>
          <div>Fabric: {fabric} | Pattern: {pattern}</div>
          <div>Colors: fabric {colors.fabric}, lining {colors.lining}, button {colors.button}, stitching {colors.stitching}</div>
        </div>
      </div>
      <div className="viewer">
        <Viewer3D
          garment={garment}
          colors={colors}
          fabric={fabric}
          pattern={pattern}
          style={style}
          measurements={measurements}
          personalization={personalization}
        />
      </div>
    </div>
  );
}
