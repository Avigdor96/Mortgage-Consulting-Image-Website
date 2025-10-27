
export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  avatar: string;
}

export interface AiMessage {
  sender: 'user' | 'ai';
  text: string;
}
