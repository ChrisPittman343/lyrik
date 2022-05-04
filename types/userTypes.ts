export interface UserData {
  id: string;
  display_name: string;
  email: string;
  external_urls: {
    /**
     * Link to user's spotify account
     */
    spotify: string;
  };
  /**
   * [URL, width, height]
   */
  images: [string, number, number];
}
