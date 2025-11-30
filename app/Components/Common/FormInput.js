'use client';

import React from 'react';

export const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-white text-sm font-medium mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 bg-background border border-stroke rounded-md text-white placeholder-white/40 focus:outline-none focus:border-main transition-colors"
        {...props}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};

export const Textarea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-white text-sm font-medium mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-2 bg-background border border-stroke rounded-md text-white placeholder-white/40 focus:outline-none focus:border-main transition-colors resize-none"
        {...props}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};

export const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-white text-sm font-medium mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 bg-background border border-stroke rounded-md text-white focus:outline-none focus:border-main transition-colors"
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};

export const FileInput = ({
  label,
  name,
  onChange,
  accept,
  required = false,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-white text-sm font-medium mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <input
        type="file"
        name={name}
        onChange={onChange}
        accept={accept}
        className="w-full px-4 py-2 bg-background border border-stroke rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-main file:text-white hover:file:bg-main/80 focus:outline-none focus:border-main transition-colors"
        {...props}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};

export const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  disabled = false,
  loading = false,
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-main hover:bg-main/80 text-white',
    secondary: 'bg-background2 hover:bg-background text-white border border-stroke',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};
