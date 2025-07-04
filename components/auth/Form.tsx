"use client"

import React from "react"
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  BookOpen,
} from "lucide-react"

interface FormProps {
  formData: {
    // firstName: string
    // lastName: string
    username: string
    email: string
    password: string
    confirmPassword: string
    genre: string
    writingExperience: string
    agreeTerms: boolean
    newsletter: boolean
  }
  errors: { [key: string]: string }
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  showPassword: boolean
  showConfirmPassword: boolean
  setShowPassword: (value: boolean) => void
  setShowConfirmPassword: (value: boolean) => void
  genres: string[]
  experienceLevels: string[]
  handleSubmit: () => void
  router: any
}

export default function Form({
  formData,
  errors,
  handleInputChange,
  showPassword,
  showConfirmPassword,
  setShowPassword,
  setShowConfirmPassword,
  genres,
  experienceLevels,
  handleSubmit,
}: FormProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
      {/* ชื่อ - นามสกุล */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          icon={<User size={18} />}
          name="firstName"
          label="ชื่อจริง"
          value={formData.firstName}
          onChange={handleInputChange}
          error={errors.firstName}
        />
        <InputField
          icon={<User size={18} />}
          name="lastName"
          label="นามสกุล"
          value={formData.lastName}
          onChange={handleInputChange}
          error={errors.lastName}
        />
      </div> */}

      {/* ชื่อผู้ใช้ */}
      <InputField
        icon={<Sparkles size={18} />}
        name="username"
        label="ชื่อผู้ใช้"
        value={formData.username}
        onChange={handleInputChange}
        error={errors.username}
      />

      {/* อีเมล */}
      <InputField
        icon={<Mail size={18} />}
        name="email"
        label="อีเมล"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
      />

      {/* รหัสผ่าน */}
      <InputField
        icon={<Lock size={18} />}
        name="password"
        label="รหัสผ่าน"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
        toggleIcon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        onToggle={() => setShowPassword(!showPassword)}
      />

      {/* ยืนยันรหัสผ่าน */}
      <InputField
        icon={<Lock size={18} />}
        name="confirmPassword"
        label="ยืนยันรหัสผ่าน"
        type={showConfirmPassword ? "text" : "password"}
        value={formData.confirmPassword}
        onChange={handleInputChange}
        error={errors.confirmPassword}
        toggleIcon={
          showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />
        }
        onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
      />

      {/* ประเภทนิยาย */}
      <SelectField
        name="genre"
        label="ประเภทนิยายที่สนใจ"
        value={formData.genre}
        options={genres}
        onChange={handleInputChange}
        error={errors.genre}
      />

      {/* ประสบการณ์เขียน */}
      <SelectField
        name="writingExperience"
        label="ประสบการณ์การเขียน"
        value={formData.writingExperience}
        options={experienceLevels}
        onChange={handleInputChange}
        error={errors.writingExperience}
      />

      {/* ยอมรับเงื่อนไข */}
      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          name="agreeTerms"
          checked={formData.agreeTerms}
          onChange={handleInputChange}
          className="mt-1"
        />
        <label htmlFor="agreeTerms" className="text-sm text-gray-700">
          ฉันยอมรับเงื่อนไขการใช้งาน
          {errors.agreeTerms && (
            <div className="text-red-500 text-xs">{errors.agreeTerms}</div>
          )}
        </label>
      </div>

      {/* สมัครรับข่าวสาร */}
      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          name="newsletter"
          checked={formData.newsletter}
          onChange={handleInputChange}
          className="mt-1"
        />
        <label htmlFor="newsletter" className="text-sm text-gray-700">
          สมัครรับข่าวสารจาก StoryVerse
        </label>
      </div>

      {/* ปุ่มลงทะเบียน */}
      <button
        onClick={handleSubmit}
        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition duration-300"
      >
        ลงทะเบียน
      </button>
    </div>
  )
}

// 🎯 InputField component ย่อย
function InputField({
  icon,
  name,
  label,
  value,
  onChange,
  type = "text",
  error,
  toggleIcon,
  onToggle,
}: {
  icon: React.ReactNode
  name: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  error?: string
  toggleIcon?: React.ReactNode
  onToggle?: () => void
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-100">
        {icon}
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className="flex-1 bg-transparent outline-none px-2"
        />
        {toggleIcon && onToggle && (
          <button type="button" onClick={onToggle} className="text-gray-500">
            {toggleIcon}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

// 🎯 SelectField component ย่อย
function SelectField({
  name,
  label,
  value,
  options,
  onChange,
  error,
}: {
  name: string
  label: string
  value: string
  options: string[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  error?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2 bg-gray-100"
      >
        <option value="">-- กรุณาเลือก --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
