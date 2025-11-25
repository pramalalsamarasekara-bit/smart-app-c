import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import {
  Camera,
  Upload,
  X,
  Plus,
  Save,
} from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import colors from '@/constants/colors';
import NavigationHeader from '@/components/NavigationHeader';

interface ProductForm {
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  category: string;
  brand: string;
  condition: string;
  quantity: string;
  sku: string;
  tags: string[];
  images: string[];
}

const categories = [
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Sports & Outdoors',
  'Beauty & Health',
  'Books & Media',
  'Toys & Games',
  'Automotive',
  'Other',
];

const conditions = ['New', 'Like New', 'Good', 'Fair', 'Poor'];

export default function SellProductScreen() {
  const { t } = useLanguage();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentTag, setCurrentTag] = useState<string>('');
  
  const [form, setForm] = useState<ProductForm>({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: categories[0],
    brand: '',
    condition: conditions[0],
    quantity: '1',
    sku: '',
    tags: [],
    images: [],
  });

  const updateForm = (field: keyof ProductForm, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const newImages = [...form.images, result.assets[0].uri];
        updateForm('images', newImages);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const newImages = [...form.images, result.assets[0].uri];
        updateForm('images', newImages);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const removeImage = (index: number) => {
    const newImages = form.images.filter((_, i) => i !== index);
    updateForm('images', newImages);
  };

  const addTag = () => {
    if (currentTag.trim() && !form.tags.includes(currentTag.trim())) {
      updateForm('tags', [...form.tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tag: string) => {
    updateForm('tags', form.tags.filter(t => t !== tag));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.description || !form.price || !form.category) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (form.images.length === 0) {
      Alert.alert('Error', 'Please add at least one product image');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Success!',
        'Your product has been listed successfully. It will be reviewed and published within 24 hours.',
        [
          {
            text: 'View Dashboard',
            onPress: () => router.push('/marketplace/seller-dashboard'),
          },
          {
            text: 'Add Another',
            onPress: () => {
              setForm({
                name: '',
                description: '',
                price: '',
                originalPrice: '',
                category: categories[0],
                brand: '',
                condition: conditions[0],
                quantity: '1',
                sku: '',
                tags: [],
                images: [],
              });
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to list product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderImagePicker = () => (
    <View style={styles.imageSection}>
      <Text style={styles.sectionTitle}>Product Images *</Text>
      <Text style={styles.sectionSubtitle}>Add up to 10 high-quality images</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
        {form.images.map((uri, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri }} style={styles.productImage} />
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={() => removeImage(index)}
            >
              <X size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        ))}
        
        {form.images.length < 10 && (
          <View style={styles.addImageButtons}>
            <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
              <Upload size={24} color={colors.primary} />
              <Text style={styles.addImageButtonText}>Gallery</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.addImageButton} onPress={takePhoto}>
              <Camera size={24} color={colors.primary} />
              <Text style={styles.addImageButtonText}>Camera</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );

  const renderFormSection = (title: string, children: React.ReactNode) => (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const renderInput = (
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void,
    multiline = false,
    keyboardType: any = 'default'
  ) => (
    <TextInput
      style={[styles.input, multiline && styles.multilineInput]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      numberOfLines={multiline ? 4 : 1}
      keyboardType={keyboardType}
      placeholderTextColor={colors.textSecondary}
    />
  );

  const renderPicker = (
    value: string,
    options: string[],
    onSelect: (value: string) => void
  ) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pickerScroll}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.pickerOption,
            value === option && styles.selectedPickerOption,
          ]}
          onPress={() => onSelect(option)}
        >
          <Text
            style={[
              styles.pickerOptionText,
              value === option && styles.selectedPickerOptionText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <NavigationHeader 
        title="Sell Product"
        showBackButton={true}
        backgroundColor={colors.background}
        textColor={colors.text}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderImagePicker()}

        {renderFormSection(
          'Basic Information',
          <>
            {renderInput(
              'Product Name *',
              form.name,
              (text) => updateForm('name', text)
            )}
            
            {renderInput(
              'Product Description *',
              form.description,
              (text) => updateForm('description', text),
              true
            )}
            
            {renderInput(
              'Brand',
              form.brand,
              (text) => updateForm('brand', text)
            )}
          </>
        )}

        {renderFormSection(
          'Category & Condition',
          <>
            <Text style={styles.inputLabel}>Category *</Text>
            {renderPicker(form.category, categories, (value) => updateForm('category', value))}
            
            <Text style={styles.inputLabel}>Condition *</Text>
            {renderPicker(form.condition, conditions, (value) => updateForm('condition', value))}
          </>
        )}

        {renderFormSection(
          'Pricing & Inventory',
          <>
            <View style={styles.priceRow}>
              <View style={styles.priceInput}>
                {renderInput(
                  'Price *',
                  form.price,
                  (text) => updateForm('price', text),
                  false,
                  'numeric'
                )}
              </View>
              <View style={styles.priceInput}>
                {renderInput(
                  'Original Price',
                  form.originalPrice,
                  (text) => updateForm('originalPrice', text),
                  false,
                  'numeric'
                )}
              </View>
            </View>
            
            <View style={styles.priceRow}>
              <View style={styles.priceInput}>
                {renderInput(
                  'Quantity',
                  form.quantity,
                  (text) => updateForm('quantity', text),
                  false,
                  'numeric'
                )}
              </View>
              <View style={styles.priceInput}>
                {renderInput(
                  'SKU (Optional)',
                  form.sku,
                  (text) => updateForm('sku', text)
                )}
              </View>
            </View>
          </>
        )}

        {renderFormSection(
          'Tags',
          <>
            <View style={styles.tagInputContainer}>
              <TextInput
                style={styles.tagInput}
                placeholder="Add tags (e.g., wireless, bluetooth)"
                value={currentTag}
                onChangeText={setCurrentTag}
                onSubmitEditing={addTag}
                placeholderTextColor={colors.textSecondary}
              />
              <TouchableOpacity style={styles.addTagButton} onPress={addTag}>
                <Plus size={20} color={colors.white} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.tagsContainer}>
              {form.tags.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  style={styles.tag}
                  onPress={() => removeTag(tag)}
                >
                  <Text style={styles.tagText}>{tag}</Text>
                  <X size={14} color={colors.primary} />
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        <View style={styles.submitSection}>
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Save size={20} color={colors.white} />
            <Text style={styles.submitButtonText}>
              {loading ? 'Publishing...' : 'Publish Product'}
            </Text>
          </TouchableOpacity>
          
          <Text style={styles.submitNote}>
            Your product will be reviewed and published within 24 hours
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  imageSection: {
    padding: 16,
    backgroundColor: colors.white,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  imageScroll: {
    flexDirection: 'row',
  },
  imageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.error,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addImageButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGray,
    gap: 4,
  },
  addImageButtonText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  formSection: {
    padding: 16,
    backgroundColor: colors.white,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.white,
    marginBottom: 12,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    marginTop: 8,
  },
  pickerScroll: {
    marginBottom: 12,
  },
  pickerOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    marginRight: 8,
  },
  selectedPickerOption: {
    backgroundColor: colors.primary,
  },
  pickerOptionText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  selectedPickerOptionText: {
    color: colors.white,
  },
  priceRow: {
    flexDirection: 'row',
    gap: 12,
  },
  priceInput: {
    flex: 1,
  },
  tagInputContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  tagInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.white,
  },
  addTagButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  tagText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  submitSection: {
    padding: 16,
    backgroundColor: colors.white,
    marginBottom: 32,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
    marginBottom: 12,
  },
  disabledButton: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  submitNote: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});