import asyncHandler from "express-async-handler";
import CustomError from "../utils/CustomError.js";
import User from "../models/userModel.js";

//@desc Create new filled-form
//@route POST '/api/form-metadata'
//@access private
export const createFilledForm = asyncHandler(async (req, res, next) => {
  const { url, heading, comment } = req.body;
  if (!url) return next(new CustomError("Missing URL!", 400));

  // const user = await User.findOne({ _id: req.userId }, { filledFormsCount: 1 });
  // if (!user) return next(new CustomError("User not found!", 404));

  const updateResult = await User.updateOne(
    { _id: req.userId },
    {
      $push: {
        filledForms: {
          // id: user.filledFormsCount + 1,
          url,
          heading: heading || "",
          comment: comment || "",
        },
      },
      // $set: {
      //   filledFormsCount: user.filledFormsCount + 1,
      // },
    }
  );

  if (updateResult.matchedCount > 0) {
    if (updateResult.modifiedCount > 0) {
      return res.status(204).json({ message: "Successfully created" });
    }
    return next(
      new CustomError("Found user but error adding new form-metadata", 500)
    );
  }
  return next(new CustomError("User not found!", 404));
});

//@desc Get all filled-forms
//@route GET '/api/form-metadata'
//@access private
export const getAllFilledForms = asyncHandler(async (req, res, next) => {
  //TODO: Pagination
  const user = await User.findOne({ _id: req.userId }).select("filledForms");
  return user
    ? res.status(200).json(user.filledForms)
    : next(new CustomError("User not found!", 404));
});

//@desc Update a filled-form
//@route PUT '/api/form-metadata'
//@access private
export const updateFilledForm = asyncHandler(async (req, res, next) => {
  const { formId, url, heading, comment } = req.body;
  if (!formId || !url)
    return next(new CustomError("Missing Form ID or URL !", 400));

  const result = await User.updateOne(
    {
      _id: req.userId,
      "filledForms._id": formId,
    },
    {
      $set: {
        "filledForms.$.url": url,
        "filledForms.$.heading": heading || "",
        "filledForms.$.comment": comment || "",
      },
    }
  );
  if (result.matchedCount > 0) {
    if (result.modifiedCount > 0) {
      return res.status(204).json({ message: "Successfully updated" });
    }
    return next(new CustomError("Found user but error updating!", 500));
  }
  return next(new CustomError("User not found!", 404));
});

//@desc Delete a filled-form
//@route DELETE '/api/form-metadata'
//@access private
export const deleteFilledForm = asyncHandler(async (req, res, next) => {
  const formId = req.query.formId;
  if (!formId) return next(new CustomError("Missing Form ID!", 400));

  const result = await User.updateOne(
    { _id: req.userId },
    {
      $pull: {
        filledForms: {
          _id: formId,
        },
      },
    }
  );
  if (result.matchedCount > 0) {
    if (result.modifiedCount > 0) {
      return res.status(204).json({ message: "Successfully deleted" });
    }
    return next(new CustomError("Found user but error deleting!", 500));
  }
  return next(new CustomError("User not found!", 404));
});
