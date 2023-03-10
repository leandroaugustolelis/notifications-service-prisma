import { makenotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makenotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makenotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makenotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
