import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('Response Accuracy');
  
  const tabs = [
    'Response Accuracy',
    'Retrieval Accuracy',
    'Hallucination',
    'Summarization',
    'Toxicity',
    'Bias',
    'Tone Identification',
    'Readability'
  ];
  
  const metrics = ['Accuracy', 'Precision', 'Recall'];
  
  // Sample data - in a real app, this would come from an API or data source
  const models = [
    { id: 1, name: 'MaziyarPanahi/calme-3.2-instruct-78b', type: 'diamond', accuracyScore: 92.8, precisionScore: 90.3, recallScore: 89.5 },
    { id: 2, name: 'MaziyarPanahi/calme-3.1-instruct-78b', type: 'circle', accuracyScore: 91.9, precisionScore: 89.6, recallScore: 88.2 },
    { id: 3, name: 'dfurman/CalmeRys-78B-Orpo-v0.1', type: 'circle', accuracyScore: 91.3, precisionScore: 88.3, recallScore: 87.5 },
    { id: 4, name: 'MaziyarPanahi/calme-2.4-rys-78b', type: 'circle', accuracyScore: 90.7, precisionScore: 87.1, recallScore: 86.9 },
    { id: 5, name: 'huihui-ai/Qwen2.5-72B-Instruct-abliterated', type: 'diamond', accuracyScore: 89.1, precisionScore: 85.3, recallScore: 84.2 },
    { id: 6, name: 'Qwen/Qwen2.5-72B-Instruct', type: 'circle', accuracyScore: 88.8, precisionScore: 84.8, recallScore: 83.7 },
  ];
  
  // Filter buttons data
  const filterGroups = [
    { name: 'For Edge Devices', count: 786 },
    { name: 'For Consumers', count: 430 },
    { name: 'Mid-range', count: 3185 },
    { name: 'For the GPU-rich', count: 165 },
  ];
  
  const [selectedFilters, setSelectedFilters] = useState([]);
  
  const toggleFilter = (filterName) => {
    if (selectedFilters.includes(filterName)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filterName));
    } else {
      setSelectedFilters([...selectedFilters, filterName]);
    }
  };
  
  // Function to render type icon
  const renderModelType = (type) => {
    switch (type) {
      case 'diamond':
        return <div className="model-type diamond"></div>;
      case 'circle':
        return <div className="model-type circle"></div>;
      default:
        return <div className="model-type"></div>;
    }
  };
  
  // Get column data based on active metric
  const getMetricScore = (model, metric) => {
    switch (metric.toLowerCase()) {
      case 'accuracy':
        return model.accuracyScore;
      case 'precision':
        return model.precisionScore;
      case 'recall':
        return model.recallScore;
      default:
        return 0;
    }
  };
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>LLM Evaluation Framework Leaderboard</h1>
      </header>
      
      <div className="filters-container">
        <div className="quick-filters">
          <span className="filter-label">Quick Filters</span>
          <div className="filter-buttons">
            {filterGroups.map((filter, index) => (
              <button
                key={index}
                className={`filter-button ${selectedFilters.includes(filter.name) ? 'selected' : ''}`}
                onClick={() => toggleFilter(filter.name)}
              >
                {filter.name} · {filter.count}
              </button>
            ))}
            <label className="checkbox-filter">
              <input type="checkbox" /> Only Official Providers · 470
            </label>
          </div>
        </div>
        
        <div className="view-options">
          <button className="options-button">
            <span className="icon">≡</span> table options
          </button>
          <button className="options-button">
            <span className="icon">☷</span> column visibility
          </button>
        </div>
      </div>
      
      <nav className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>
      
      <div className="metrics-selector">
        {metrics.map((metric) => (
          <button key={metric} className="metric-button">
            {metric}
          </button>
        ))}
      </div>
      
      <div className="leaderboard-container">
        <table className="leaderboard">
          <thead>
            <tr>
              <th className="rank-col">Rank</th>
              <th className="type-col">Type</th>
              <th className="model-col">Model</th>
              <th className="score-col">Accuracy</th>
              <th className="score-col">Precision</th>
              <th className="score-col">Recall</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model, index) => (
              <tr key={model.id} className="model-row">
                <td className="rank-cell">
                  <div className={`rank-badge rank-${index + 1}`}>
                    {index + 1}
                  </div>
                </td>
                <td className="type-cell">{renderModelType(model.type)}</td>
                <td className="model-cell">
                  <a href="#" className="model-link">{model.name}</a>
                  <button className="copy-button">
                    <span className="copy-icon">⊟</span>
                  </button>
                </td>
                <td className="score-cell">
                  <div className="score-wrapper">
                    <span className="score-indicator">●</span>
                    <span className="score-value">{model.accuracyScore.toFixed(2)}%</span>
                  </div>
                </td>
                <td className="score-cell">
                  <div className="score-wrapper">
                    <span className="score-value">{model.precisionScore.toFixed(2)}%</span>
                  </div>
                </td>
                <td className="score-cell">
                  <div className="score-wrapper">
                    <span className="score-value">{model.recallScore.toFixed(2)}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;