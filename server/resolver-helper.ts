
import { Document, DocumentToObjectOptions } from "mongoose";


// Should be used in a service or something, where it's at is fine.
export function toJSON(doc: Document, options?: DocumentToObjectOptions) {
  return doc.toJSON(
    options || {
      versionKey: false,
      virtuals: true,
      transform: (document, ret) => {
        delete ret._id;
        ret.id = document._id;
      },
    }
  );
}
