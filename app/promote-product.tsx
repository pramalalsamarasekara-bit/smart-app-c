import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Platform,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import {
  Upload,
  Camera,
  DollarSign,
  Package,
  User,
  Mail,
  Phone,
} from 'lucide-react-native';
import colors from '@/constants/colors';

interface ProductData {
  vendorName: string;
  productName: string;
  description: string;
  imageUri: string;
  price: string;
  category: string;
  duration: string;
  contactEmail: string;
  contactPhone: string;
}

const categories = [
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Sports & Outdoors',
  'Health & Beauty',
  'Books & Media',
  'Toys & Games',
  'Automotive',
  'Food & Beverages',
  'Other',
];

const promotionDurations = [
  { label: '7 days - $5', value: '7', price: 5 },
  { label: '14 days - $8', value: '14', price: 8 },
  { label: '30 days - $12', value: '30', price: 12 },
];

export default function PromoteProduct() {
  const { t } = useTranslation();
  const [productData, setProductData] = useState<ProductData>({
    vendorName: '',
    productName: '',
    description: '',
    imageUri: '',
    price: '',
    category: categories[0],
    duration: '7',
    contactEmail: '',
    contactPhone: '',
  });
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof ProductData, value: string) => {
    setProductData((prev) => ({ ...prev, [field]: value }));
  };

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'We need photo library access to upload product images.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        updateField('imageUri', result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'We need camera access to take product photos.'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        updateField('imageUri', result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const showImageOptions = () => {
    Alert.alert('Product Image', 'Choose how to add your product image', [
      { text: 'Take Photo', onPress: takePhoto },
      { text: 'Choose from Gallery', onPress: pickImage },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const validateForm = (): boolean => {
    if (!productData.vendorName.trim()) {
      Alert.alert('Error', 'Please enter vendor name');
      return false;
    }
    if (!productData.productName.trim()) {
      Alert.alert('Error', 'Please enter product name');
      return false;
    }
    if (!productData.description.trim()) {
      Alert.alert('Error', 'Please enter product description');
      return false;
    }
    if (!productData.price.trim()) {
      Alert.alert('Error', 'Please enter product price');
      return false;
    }
    if (!productData.contactEmail.trim() && !productData.contactPhone.trim()) {
      Alert.alert('Error', 'Please provide either email or phone contact');
      return false;
    }
    return true;
  };

  const handleContinueToPayment = () => {
    if (!validateForm()) return;

    const selectedDuration = promotionDurations.find(
      (d) => d.value === productData.duration
    );

    router.push({
      pathname: '/promote-checkout',
      params: {
        productData: JSON.stringify(productData),
        price: selectedDuration?.price || 5,
        duration: productData.duration,
      },
    });
  };

  const selectedDuration = promotionDurations.find(
    (d) => d.value === productData.duration
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Promote Your Product',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>
            Welcome to Smart Shopping Vendor Portal
          </Text>
          <Text style={styles.welcomeDescription}>
            Promote your products to thousands of Smart Shopping app users.
            Reach new customers and boost your sales with our intelligent
            product discovery platform.
          </Text>
        </View>

        {/* Pricing Cards */}
        <View style={styles.pricingSection}>
          <Text style={styles.sectionTitle}>Choose Your Promotion Duration</Text>
          <View style={styles.pricingCards}>
            {promotionDurations.map((duration) => (
              <TouchableOpacity
                key={duration.value}
                style={[
                  styles.pricingCard,
                  productData.duration === duration.value &&
                    styles.selectedPricingCard,
                ]}
                onPress={() => updateField('duration', duration.value)}
              >
                <Text style={styles.pricingDuration}>
                  {duration.value} Days
                </Text>
                <Text style={styles.pricingPrice}>${duration.price}</Text>
                <Text style={styles.pricingLabel}>Promotion Fee</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Product Information</Text>

          {/* Vendor Name */}
          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <User size={20} color={colors.primary} />
              <Text style={styles.inputLabel}>Vendor Name *</Text>
            </View>
            <TextInput
              style={styles.textInput}
              value={productData.vendorName}
              onChangeText={(text) => updateField('vendorName', text)}
              placeholder="Enter your business/vendor name"
              placeholderTextColor={colors.lightGray}
            />
          </View>

          {/* Product Name */}
          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <Package size={20} color={colors.primary} />
              <Text style={styles.inputLabel}>Product Name *</Text>
            </View>
            <TextInput
              style={styles.textInput}
              value={productData.productName}
              onChangeText={(text) => updateField('productName', text)}
              placeholder="Enter product name"
              placeholderTextColor={colors.lightGray}
            />
          </View>

          {/* Product Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Product Description *</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={productData.description}
              onChangeText={(text) => updateField('description', text)}
              placeholder="Describe your product, its features, and benefits"
              placeholderTextColor={colors.lightGray}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Product Image */}
          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <Camera size={20} color={colors.primary} />
              <Text style={styles.inputLabel}>Product Image</Text>
            </View>
            <TouchableOpacity
              style={styles.imageUpload}
              onPress={showImageOptions}
            >
              {productData.imageUri ? (
                <Image
                  source={{ uri: productData.imageUri }}
                  style={styles.uploadedImage}
                />
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <Upload size={40} color={colors.lightGray} />
                  <Text style={styles.uploadText}>
                    Tap to add product image
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Price */}
          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <DollarSign size={20} color={colors.primary} />
              <Text style={styles.inputLabel}>Price *</Text>
            </View>
            <TextInput
              style={styles.textInput}
              value={productData.price}
              onChangeText={(text) => updateField('price', text)}
              placeholder="Enter product price (e.g., $29.99)"
              placeholderTextColor={colors.lightGray}
              keyboardType="numeric"
            />
          </View>

          {/* Category */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Category</Text>
            <View style={styles.categoryChipsContainer}>
              {categories.map((category) => {
                const selected = productData.category === category;
                return (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryChip,
                      selected && styles.categoryChipSelected,
                    ]}
                    onPress={() => updateField('category', category)}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        selected && styles.categoryChipTextSelected,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Contact Information */}
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <Mail size={20} color={colors.primary} />
              <Text style={styles.inputLabel}>Contact Email</Text>
            </View>
            <TextInput
              style={styles.textInput}
              value={productData.contactEmail}
              onChangeText={(text) => updateField('contactEmail', text)}
              placeholder="your.email@example.com"
              placeholderTextColor={colors.lightGray}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <Phone size={20} color={colors.primary} />
              <Text style={styles.inputLabel}>Contact Phone</Text>
            </View>
            <TextInput
              style={styles.textInput}
              value={productData.contactPhone}
              onChangeText={(text) => updateField('contactPhone', text)}
              placeholder="+1 (555) 123-4567"
              placeholderTextColor={colors.lightGray}
              keyboardType="phone-pad"
            />
          </View>

          <Text style={styles.contactNote}>
            * Please provide at least one contact method (email or phone)
          </Text>
        </View>

        {/* Summary Section */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Promotion Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Duration:</Text>
              <Text style={styles.summaryValue}>
                {productData.duration} days
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Promotion Fee:</Text>
              <Text style={styles.summaryValue}>
                ${selectedDuration?.price}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Badge:</Text>
              <Text style={styles.summaryBadge}>🔥 Sponsored</Text>
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinueToPayment}
          disabled={loading}
        >
          <Text style={styles.continueButtonText}>
            {loading ? 'Processing...' : 'Continue to Payment'}
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: colors.primary,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 10,
  },
  welcomeDescription: {
    fontSize: 16,
    color: colors.white,
    lineHeight: 24,
    opacity: 0.9,
  },
  pricingSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  pricingCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  pricingCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  selectedPricingCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  pricingDuration: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  pricingPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  pricingLabel: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.7,
  },
  formSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.white,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageUpload: {
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 8,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  uploadPlaceholder: {
    alignItems: 'center',
  },
  uploadText: {
    marginTop: 10,
    fontSize: 14,
    color: colors.text,
    opacity: 0.7,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  picker: {
    height: 50,
  },
  categoryChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryChipText: {
    fontSize: 14,
    color: colors.text,
  },
  categoryChipTextSelected: {
    color: colors.white,
    fontWeight: '600',
  },
  contactNote: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.7,
    fontStyle: 'italic',
    marginTop: 10,
  },
  summarySection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: colors.text,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  summaryBadge: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  continueButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 30,
  },
});
