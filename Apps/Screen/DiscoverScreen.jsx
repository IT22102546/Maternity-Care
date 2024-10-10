import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import RenderHTML from 'react-native-render-html'; 
import { useWindowDimensions } from 'react-native'; 
import Icon from 'react-native-vector-icons/Ionicons'; 

export default function DiscoverScreen() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedArticle, setExpandedArticle] = useState(null); 
  const [categories, setCategories] = useState(['All-Articles', 'Nutrition', 'Exercises', 'Symptoms']); 
  const [selectedCategory, setSelectedCategory] = useState('All-Articles'); 
  const [translateToSinhala, setTranslateToSinhala] = useState(false); 
  const db = getFirestore(app);
  const { width } = useWindowDimensions(); 

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'articles'));
      const articlesArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articlesArray);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching articles: ', error);
      setLoading(false);
    }
  };

  const toggleExpandArticle = (id) => {
    setExpandedArticle(expandedArticle === id ? null : id); 
  };

  const handleBackArrowPress = () => {
    setExpandedArticle(null); 
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category); 
  };

  const filteredArticles = articles.filter(article => 
    selectedCategory === 'All-Articles' || article.category === selectedCategory
  );

  // Mock translation function
  const mockTranslate = (text) => {
    const translations = {
      'Nutrition': 'ආහාර විශේෂණය',
      'Exercises': 'කර්ම',
      'Symptoms': 'රෝග ලක්ෂණ',
      'All-Articles': 'සියලු ලිපි',
      
    };
    return translations[text] || text;
  };

  // Function to translate article data
  const translateArticleData = (article) => {
    return {
      ...article,
      title: translateToSinhala ? mockTranslate(article.title) : article.title,
      desc: translateToSinhala ? mockTranslate(article.desc) : article.desc,
    };
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {expandedArticle && (
        <TouchableOpacity style={styles.backButton} onPress={handleBackArrowPress}>
          <Icon name="arrow-back" size={30} color="#000" />
          <Text style={styles.backButtonText}>
            {translateToSinhala ? mockTranslate('Back') : 'Back'}
          </Text>
        </TouchableOpacity>
      )}

      {/* Category Selection */}
      <View style={styles.categoryContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.categoryButton, selectedCategory === category && styles.selectedCategoryButton]}
            onPress={() => handleCategorySelect(category)}
          >
            <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
              {translateToSinhala ? mockTranslate(category) : category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Articles */}
      {filteredArticles.map(article => {
        const translatedArticle = translateArticleData(article); // Get translated article
        return (
          <View key={article.id} style={styles.articleCard}>
            <TouchableOpacity onPress={() => toggleExpandArticle(article.id)}>
              <Text style={styles.articleTitle}>
                {translatedArticle.title}
              </Text>
              <Image
                source={{ uri: article.image }}
                style={styles.articleImage}
              />
            </TouchableOpacity>
            {expandedArticle === article.id && (
              <View style={styles.articleContent}>
                <RenderHTML
                  contentWidth={width}
                  source={{ html: translatedArticle.desc }} 
                />
              </View>
            )}
          </View>
        );
      })}

      {/* Floating Translate Button */}
      <TouchableOpacity 
        style={styles.translateButton} 
        onPress={() => setTranslateToSinhala(prev => !prev)}
      >
        <Icon name="globe-outline" size={30} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  articleCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  articleContent: {
    marginTop: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 20, // Added padding at the top for the back button
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 18,
    color: '#000',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingTop: 20, // Add padding at the top
  },
  categoryButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedCategoryButton: {
    backgroundColor: '#333',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  translateButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#333',
    borderRadius: 30,
    padding: 15,
    elevation: 5,
  },
});
