import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

export default function LoginScreen({ navigation, updateMemory }) {
  const [email, setEmail] = useState('tomyhatem43@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('خطأ', 'يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }

    setLoading(true);

    // Demo login - replace with real backend/auth in production
    setTimeout(() => {
      if (email === 'tomyhatem43@gmail.com' && password === 'Hamdyhatem560$') {
        // Save login state
        updateMemory({ isLoggedIn: true, userEmail: email });
        Alert.alert('نجاح', 'تم تسجيل الدخول بنجاح!');
        navigation.replace('Dashboard');
      } else {
        Alert.alert('خطأ', 'البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>V6 CORE Ultimate</Text>
        <Text style={styles.subtitle}>تسجيل الدخول إلى الاستوديو السينمائي الذكي</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>البريد الإلكتروني</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="your@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>كلمة المرور</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="********"
          secureTextEntry
        />

        <TouchableOpacity 
          style={[styles.loginButton, loading && styles.disabledButton]} 
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Alert.alert('نسيت كلمة المرور؟', 'في النسخة الكاملة سيتم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني.')}>
          <Text style={styles.forgotText}>نسيت كلمة المرور؟</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>© V6 CORE - استوديو سينمائي إعجازي</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    color: '#d4af37',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#f5d9a0',
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#1a1a1a',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#d4af37',
  },
  label: {
    color: '#d4af37',
    fontSize: 14,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#0a0a0a',
    color: '#fff',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d4af37',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#d4af37',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  disabledButton: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#0a0a0a',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  footer: {
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 12,
  },
});