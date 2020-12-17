export default class Lesson {
  constructor(title, body, video_url, video_type, status, sort_position, status_comments, user_id, category_id, product_id) {
    this.title = title;
    this.body = body;
    this.video_url = video_url;
    this.video_type = video_type;
    this.status = status;
    this.sort_position = sort_position;
    this.status_comments = status_comments;
    this.user_id = user_id;
    this.category_id =  category_id;
    this.product_id = product_id;
  }
}