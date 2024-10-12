import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import moment from 'moment';

const PostCard = ({ posts }) => {
  return (
    <View style={styles.overlay}>
      <Text style={styles.heading}>Available Doctors: {posts?.length}</Text>
      {posts?.map((post, i) => (
        <View style={styles.card} key={i}>
          <Text style={styles.title}>Doctor Name: {post?.name}</Text>
          <Text style={styles.specialization}>Specialization: {post?.specialization}</Text>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{post?.postedBy?.name}</Text>
            <Text style={styles.date}>{moment(post?.createdAt).format("DD-MM-YYYY")}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "#E91E63",
  },
  heading: {
    color: '#ffebcd',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  card: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  specialization: {
    fontSize: 18,
    color: 'black',
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
    paddingTop: 15,
  },
  userName: {
    fontSize: 16,
    color: '#ffffff',
    fontStyle: 'italic',
  },
  date: {
    fontSize: 14,
    color: '#f0f8ff',
  },
});

export default PostCard;
