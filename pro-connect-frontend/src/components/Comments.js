const handleSubmit = async (e) => {
  e.preventDefault();
  if (!newComment.trim()) return;

  try {
    const response = await axios.post(
      `http://localhost:5000/api/projects/${projectId}/comments`,
      { content: newComment },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    setComments([...comments, { ...response.data, user }]);
    setNewComment('');
  } catch (error) {
    console.error('Error posting comment:', error);
  }
};