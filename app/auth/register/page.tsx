"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  BookOpen,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import Header from "@/components/auth/Header";
import Form from "@/components/auth/Form";

interface FormData {
  //   firstName: string
  //   lastName: string
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  genre: string;
  writingExperience: string;
  agreeTerms: boolean;
  newsletter: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    // firstName: "",
    // lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    genre: "",
    writingExperience: "",
    agreeTerms: false,
    newsletter: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();

  const genres = [
    "แฟนตาซี",
    "โรแมนติก",
    "ลึกลับ/สืบสวน",
    "ไซไฟ",
    "ระทึกขวัญ",
    "ผจญภัย",
    "ดราม่า",
    "ตลก",
    "สยองขวัญ",
    "ประวัติศาสตร์",
    "อื่นๆ",
  ];

  const experienceLevels = [
    "มือใหม่ (ไม่เคยเขียน)",
    "มือใหม่ (เขียนเป็นงานอดิเรก)",
    "มีประสบการณ์บ้าง",
    "มีประสบการณ์มาก",
    "นักเขียนมืออาชีพ",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const inputValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: inputValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    // if (!formData.firstName.trim()) newErrors.firstName = "กรุณากรอกชื่อจริง"
    // if (!formData.lastName.trim()) newErrors.lastName = "กรุณากรอกนามสกุล"
    if (!formData.username.trim()) newErrors.username = "กรุณากรอกชื่อผู้ใช้";
    else if (formData.username.length < 3)
      newErrors.username = "ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร";
    if (!formData.email.trim()) newErrors.email = "กรุณากรอกอีเมล";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    if (!formData.password) newErrors.password = "กรุณากรอกรหัสผ่าน";
    else if (formData.password.length < 8)
      newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
    if (!formData.genre) newErrors.genre = "กรุณาเลือกประเภทนิยายที่สนใจ";
    if (!formData.writingExperience)
      newErrors.writingExperience = "กรุณาเลือกประสบการณ์การเขียน";
    if (!formData.agreeTerms)
      newErrors.agreeTerms = "กรุณายอมรับเงื่อนไขการใช้งาน";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(
          `ยินดีต้อนรับสู่ StoryVerse, ${formData.username}! การสมัครสำเร็จแล้ว`
        );
        router.push("/auth/login");
      } else {
        const data = await res.json();
        alert(`สมัครไม่สำเร็จ: ${data.message}`);
      }
    } catch (err) {
      alert("เกิดข้อผิดพลาดขณะสมัครสมาชิก");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Header />
        <Form
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          setShowPassword={setShowPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          genres={genres}
          experienceLevels={experienceLevels}
          handleSubmit={handleSubmit}
          router={router}
        />

        {/* 🔽 เพิ่มตรงนี้ */}
        <p className="mt-6 text-center text-sm text-white">
          มีบัญชีอยู่แล้ว?{" "}
          <Link href="/auth/login" className="text-blue-400 hover:underline">
            เข้าสู่ระบบที่นี่
          </Link>
        </p>
      </div>
    </div>
  );
}
