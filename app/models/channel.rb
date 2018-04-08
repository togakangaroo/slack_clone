class Channel < ApplicationRecord
  validates :title, :owner_id, :workspace_id, presence: true

  belongs_to :owner, foreign_key: :owner_id, class_name: 'User'
  belongs_to :workspace
  has_many :subs, class_name: 'ChannelSub'

  def is_user_subbed?(user)
    users_subbed = subs.where(channel_subs: { user_id: user.id })
    users_subbed.length > 0
  end
end
